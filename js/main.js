// ADRIC — scripts communs (menu mobile, année du pied de page, formulaire de contact)

// Numéro WhatsApp de l'ONG, format international sans "+" ni espaces
const ADRIC_WHATSAPP = "243810154596";

document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const bouton = document.querySelector(".menu-bouton");
  const nav = document.querySelector(".nav");
  if (bouton && nav) {
    bouton.addEventListener("click", () => {
      const ouvert = nav.classList.toggle("ouvert");
      bouton.setAttribute("aria-expanded", ouvert);
    });
  }

  // Année courante dans le pied de page
  document.querySelectorAll("[data-annee]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Liens WhatsApp
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    const texte = el.getAttribute("data-whatsapp") || "Bonjour ADRIC,";
    el.href = `https://wa.me/${ADRIC_WHATSAPP}?text=${encodeURIComponent(texte)}`;
  });

  // Formulaire de contact (envoyé via Formspree, voir LISEZMOI.md)
  const form = document.querySelector("#form-contact");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const message = document.querySelector("#contact-ok");
      const bouton = form.querySelector("button[type=submit]");
      bouton.disabled = true;
      bouton.textContent = "Envoi en cours…";
      try {
        const rep = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!rep.ok) throw new Error();
        form.reset();
        message.textContent = "Merci ! Votre message a bien été envoyé. Nous vous répondrons rapidement.";
      } catch {
        message.textContent = "L'envoi a échoué. Écrivez-nous directement par e-mail ou sur WhatsApp.";
      }
      message.classList.add("visible");
      bouton.disabled = false;
      bouton.textContent = "Envoyer le message";
    });
  }
});
