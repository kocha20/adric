# Site web ADRIC — guide

Site statique (HTML/CSS/JS), très léger, pensé pour mobile et connexions lentes. Aucun serveur ni base de données : il peut être hébergé gratuitement.

## Contenu

| Fichier | Page |
|---|---|
| `index.html` | Accueil |
| `a-propos.html` | Qui sommes-nous |
| `projets.html` | Nos projets |
| `don.html` | Faire un don |
| `contact.html` | Contact |
| `css/style.css` | Couleurs et mise en page |
| `js/main.js` | Menu mobile, WhatsApp, formulaire de contact |
| `js/don.js` | Fonctionnement de la page de don |

## 1. Informations à compléter avant la mise en ligne

Cherchez `À COMPLÉTER` dans les fichiers : chaque endroit à modifier est signalé.

- **Numéro WhatsApp** : `js/main.js`, ligne `ADRIC_WHATSAPP` (format `243xxxxxxxxx`, sans `+`).
- **Numéros Mobile Money** : `js/don.js`, tableau `OPERATEURS` (supprimez les opérateurs non utilisés).
- **Coordonnées bancaires** : `don.html`, bloc « Virement ».
- **Chiffres clés, histoire, équipe, activités** : déjà remplis à partir des statuts, du ROI et des photos ; à relire et ajuster si besoin (`index.html`, `a-propos.html`, `projets.html`).
- **Adresse, téléphone, e-mail** : pied de page de chaque page et `contact.html`.
- **Taux USD/CDF** : `js/don.js`, ligne `TAUX_CDF`.

## 2. Photos

Déposez vos photos dans `images/`, compressées (largeur 1200 px max, idéalement en `.webp` via squoosh.app).
Remplacez ensuite un bloc `<svg>` d'illustration par `<img src="images/nom.jpg" alt="Description">`.
Pour la photo de fond de l'accueil : `images/heros.jpg` puis décommentez la ligne indiquée dans `css/style.css`.

## 3. Formulaire de contact (gratuit)

1. Créez un compte sur formspree.io avec l'e-mail de l'ONG.
2. Créez un formulaire et copiez son identifiant (ex. `xyzabcd`).
3. Dans `contact.html`, remplacez `VOTRE_ID` par cet identifiant.

## 4. Paiement par carte (facultatif)

Ouvrez un compte marchand ONG chez un prestataire actif en RDC (**MaxiCash**, **FlexPay**, ou **PayPal** pour l'international), créez un « lien de paiement », puis collez-le dans `js/don.js` (`LIEN_PAIEMENT_CARTE`). Tant que ce champ est vide, l'option carte affiche « bientôt disponible ».

Pour des paiements Mobile Money **automatiques** (sans saisie manuelle du numéro), ces mêmes prestataires proposent des boutons de paiement intégrables : c'est l'étape suivante possible.

## 5. Mise en ligne gratuite (Netlify)

1. Créez un compte sur netlify.com.
2. Menu **Add new site → Deploy manually**, puis glissez-déposez le dossier `adric-site`.
3. Le site est en ligne en quelques secondes (adresse `xxx.netlify.app`).
4. Achetez un nom de domaine (`adric.org` ou `adric.cd`) et reliez-le dans **Domain settings**.

Pour mettre à jour : modifiez les fichiers puis glissez-déposez à nouveau le dossier.
