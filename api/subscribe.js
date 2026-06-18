// Fonction serverless d'inscription à la newsletter — compatible Vercel.
// Reçoit { email } en POST, ajoute le contact à une liste Brevo (Sendinblue).
//
// Variables d'environnement requises (à configurer chez l'hébergeur) :
//   BREVO_API_KEY   — clé API de votre compte Brevo
//   BREVO_LIST_ID   — identifiant numérique de la liste de diffusion
//
// Aucune dépendance : on utilise fetch (Node 18+).

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Méthode non autorisée." });
  }

  let email;
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    email = (body.email || "").trim().toLowerCase();
  } catch {
    return res.status(400).json({ ok: false, message: "Requête invalide." });
  }

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res
      .status(400)
      .json({ ok: false, message: "Adresse e-mail invalide." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !listId) {
    console.error("BREVO_API_KEY ou BREVO_LIST_ID manquant.");
    return res
      .status(500)
      .json({ ok: false, message: "Service d'inscription non configuré." });
  }

  try {
    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (r.status === 201 || r.status === 204) {
      return res.status(200).json({
        ok: true,
        message: "Inscription confirmée ! Merci, à très bientôt.",
      });
    }

    const data = await r.json().catch(() => ({}));
    if (data && data.code === "duplicate_parameter") {
      return res
        .status(409)
        .json({ ok: false, message: "Vous êtes déjà inscrit·e." });
    }

    console.error("Brevo error", r.status, data);
    return res
      .status(502)
      .json({ ok: false, message: "Inscription momentanément indisponible." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ ok: false, message: "Erreur interne. Réessayez plus tard." });
  }
}
