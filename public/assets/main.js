// Interactions front-end : menu mobile + soumission de la newsletter.
(function () {
  "use strict";

  // --- Menu mobile -----------------------------------------------------------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Newsletter ------------------------------------------------------------
  var forms = document.querySelectorAll("form[data-newsletter]");
  forms.forEach(function (form) {
    var status = form.querySelector(".nl-status");
    var button = form.querySelector("button[type=submit]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (status) {
        status.textContent = "";
        status.className = "nl-status";
      }

      var emailInput = form.querySelector('input[type=email]');
      var honeypot = form.querySelector('input[name=company]');
      var email = (emailInput && emailInput.value || "").trim();

      // Anti-bot : si le champ caché est rempli, on ignore silencieusement.
      if (honeypot && honeypot.value) {
        setStatus("Merci !", "ok");
        return;
      }
      if (!email || email.indexOf("@") === -1) {
        setStatus("Merci d'indiquer une adresse e-mail valide.", "error");
        return;
      }

      if (button) {
        button.disabled = true;
        button.dataset.label = button.textContent;
        button.textContent = "Envoi…";
      }

      fetch(form.getAttribute("action"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email }),
      })
        .then(function (r) {
          return r.json().catch(function () {
            return {};
          }).then(function (data) {
            return { ok: r.ok, data: data, statusCode: r.status };
          });
        })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus(
              (res.data && res.data.message) ||
                "Inscription confirmée ! Vérifiez votre boîte de réception.",
              "ok"
            );
          } else if (res.statusCode === 409) {
            setStatus("Vous êtes déjà inscrit·e à la newsletter. À bientôt !", "ok");
          } else {
            setStatus(
              (res.data && res.data.message) ||
                "Une erreur est survenue. Réessayez dans un instant.",
              "error"
            );
          }
        })
        .catch(function () {
          setStatus(
            "Service d'inscription indisponible. Réessayez plus tard.",
            "error"
          );
        })
        .finally(function () {
          if (button) {
            button.disabled = false;
            button.textContent = button.dataset.label || "S'inscrire";
          }
        });

      function setStatus(msg, kind) {
        if (!status) return;
        status.textContent = msg;
        status.className = "nl-status " + (kind || "");
      }
    });
  });
})();
