// Fonction serverless d'inscription à la newsletter — compatible Netlify.
// Même logique que api/subscribe.js, adaptée à la signature Netlify Functions.
//
// Variables d'environnement requises (Netlify → Site settings → Environment) :
//   BREVO_API_KEY   — clé API de votre compte Brevo
//   BREVO_LIST_ID   — identifiant numérique de la liste de diffusion

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, message: "Méthode non autorisée." });
  }

  let email;
  try {
    const body = JSON.parse(event.body || "{}");
    email = (body.email || "").trim().toLowerCase();
  } catch {
    return json(400, { ok: false, message: "Requête invalide." });
  }

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json(400, { ok: false, message: "Adresse e-mail invalide." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !listId) {
    console.error("BREVO_API_KEY ou BREVO_LIST_ID manquant.");
    return json(500, { ok: false, message: "Service d'inscription non configuré." });
  }

  try {
    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
    });

    if (r.status === 201 || r.status === 204) {
      return json(200, {
        ok: true,
        message: "Inscription confirmée ! Merci, à très bientôt.",
      });
    }

    const data = await r.json().catch(() => ({}));
    if (data && data.code === "duplicate_parameter") {
      return json(409, { ok: false, message: "Vous êtes déjà inscrit·e." });
    }

    console.error("Brevo error", r.status, data);
    return json(502, { ok: false, message: "Inscription momentanément indisponible." });
  } catch (err) {
    console.error(err);
    return json(500, { ok: false, message: "Erreur interne. Réessayez plus tard." });
  }
}

function json(statusCode, payload) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
}
