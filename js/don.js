// ADRIC — page "Faire un don"

// Numéros Mobile Money de l'ONG
const OPERATEURS = [
  { nom: "M-Pesa (Vodacom)", couleur: "#e60000", numero: "+243 810 154 596" },
  { nom: "Airtel Money", couleur: "#c8102e", numero: "+243 979 057 655" },
];

// ⚠️ À COMPLÉTER : lien de paiement par carte (MaxiCash, FlexPay, PayPal…). Laisser vide pour masquer.
const LIEN_PAIEMENT_CARTE = "";

const MONTANTS = {
  USD: [10, 25, 50, 100],
  CDF: [25000, 50000, 100000, 250000],
};

// Exemples d'impact (en USD) — à adapter aux coûts réels
const IMPACTS = [
  [100, "une ruche moderne équipée pour un apiculteur 🐝"],
  [50, "des plantules pour reboiser une parcelle 🌳"],
  [25, "des outils aratoires pour un paysan 🛠️"],
  [10, "des semences maraîchères pour une famille paysanne 🌱"],
  [0, "un soutien précieux à nos actions sur le terrain 🤝"],
];
const TAUX_CDF = 2800; // ⚠️ taux indicatif 1 USD ≈ X CDF, à mettre à jour

let devise = "USD";
let montant = 25;
let methode = "mobile";

const fmt = (n) =>
  devise === "USD" ? `${n.toLocaleString("fr-FR")} $` : `${n.toLocaleString("fr-FR")} FC`;

function afficherMontants() {
  const zone = document.getElementById("montants");
  zone.innerHTML = "";
  MONTANTS[devise].forEach((m) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = fmt(m);
    if (m === montant) b.classList.add("actif");
    b.addEventListener("click", () => {
      montant = m;
      document.getElementById("montant-libre").value = "";
      majAffichage();
    });
    zone.appendChild(b);
  });
}

function majAffichage() {
  afficherMontants();
  document.querySelectorAll(".montant-texte").forEach((el) => (el.textContent = montant ? fmt(montant) : "—"));

  const enUSD = devise === "USD" ? montant : montant / TAUX_CDF;
  const impact = IMPACTS.find(([seuil]) => enUSD >= seuil)[1];
  document.getElementById("impact").innerHTML = montant
    ? `Avec <strong>${fmt(montant)}</strong>, vous financez ${impact}`
    : "Choisissez un montant pour voir l'impact de votre don.";

  majWhatsApp();
}

function majWhatsApp() {
  const nom = document.getElementById("donateur").value.trim();
  const moyens = { mobile: "Mobile Money", carte: "carte bancaire", virement: "virement bancaire" };
  const texte =
    `Bonjour ADRIC, je viens de faire un don de ${fmt(montant)} par ${moyens[methode]}.` +
    (nom ? ` Mon nom : ${nom}.` : "") +
    " Merci de m'envoyer mon reçu.";
  document.getElementById("confirmer-whatsapp").href =
    `https://wa.me/${ADRIC_WHATSAPP}?text=${encodeURIComponent(texte)}`;
}

function afficherOperateurs() {
  const zone = document.getElementById("operateurs");
  const notif = document.getElementById("notif-copie");
  OPERATEURS.forEach((op) => {
    const div = document.createElement("div");
    div.className = "operateur";
    div.innerHTML = `
      <div class="nom"><span class="pastille" style="background:${op.couleur}"></span>${op.nom}</div>
      <div class="numero">${op.numero}</div>
      <button type="button">Copier le numéro</button>`;
    div.querySelector("button").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(op.numero.replace(/\s/g, ""));
        notif.textContent = `Numéro ${op.nom} copié`;
      } catch {
        notif.textContent = op.numero;
      }
      notif.classList.add("visible");
      setTimeout(() => notif.classList.remove("visible"), 1800);
    });
    zone.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  afficherOperateurs();

  document.querySelectorAll("[data-devise]").forEach((b) =>
    b.addEventListener("click", () => {
      devise = b.dataset.devise;
      document.querySelectorAll("[data-devise]").forEach((x) => x.classList.toggle("actif", x === b));
      montant = MONTANTS[devise][1];
      document.getElementById("montant-libre").value = "";
      majAffichage();
    })
  );

  document.getElementById("montant-libre").addEventListener("input", (e) => {
    montant = Math.max(0, Math.round(Number(e.target.value) || 0));
    majAffichage();
  });

  document.querySelectorAll("[data-methode]").forEach((b) =>
    b.addEventListener("click", () => {
      methode = b.dataset.methode;
      document.querySelectorAll("[data-methode]").forEach((x) => x.classList.toggle("actif", x === b));
      document.querySelectorAll(".panneau").forEach((p) =>
        p.classList.toggle("actif", p.id === `panneau-${methode}`)
      );
      majWhatsApp();
    })
  );

  document.getElementById("donateur").addEventListener("input", majWhatsApp);

  const lienCarte = document.getElementById("lien-carte");
  if (LIEN_PAIEMENT_CARTE) {
    lienCarte.href = LIEN_PAIEMENT_CARTE;
  } else {
    lienCarte.style.display = "none";
    document.getElementById("carte-indispo").style.display = "block";
  }

  majAffichage();
});
