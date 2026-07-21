# Tahar &amp; Majda — Invitation de Mariage

Invitation de mariage cinématique, bilingue (français / arabe), pour le **27 septembre 2026** à **Fès**.
Site 100% statique (HTML/CSS/JS, sans dépendance de build), hébergé gratuitement sur **GitHub Pages**.

## ✨ Ce qui est inclus

- Ouverture cinématique façon porte de palais fassi (or/émeraude), avec particules dorées.
- Palette luxe rose bébé + or + touches émeraude.
- Cartes photo avec effet 3D (tilt au survol) et halo doré.
- Compte à rebours en direct vers le 27/09/2026.
- Date affichée dynamiquement en français et en arabe (calculée automatiquement, pas de risque d'erreur de jour).
- Carte de Fès (OpenStreetMap, gratuite, sans clé API).
- Section galerie, programme de la journée, RSVP par e-mail.
- Bouton musique d'ambiance optionnel (s'auto-masque si aucun fichier audio n'est fourni).

## 📸 Ajouter les vraies photos

Les photos sont pour l'instant des **placeholders élégants** (cadre doré + icône). Dès que tu déposes les fichiers suivants dans `assets/img/` **avec exactement ces noms**, ils remplacent automatiquement les placeholders — aucune modification de code nécessaire :

| Fichier à ajouter          | Emplacement dans le site                        |
|----------------------------|--------------------------------------------------|
| `assets/img/couple.jpg`    | Photo principale (en-tête / hero)                 |
| `assets/img/bride.jpg`     | Portrait de Majda (galerie)                       |
| `assets/img/groom.jpg`     | Portrait de Tahar (galerie)                       |
| `assets/img/couple-2.jpg`  | Photo du couple assis (galerie)                   |
| `assets/img/celebration.jpg` | Photo de la célébration/danse (galerie)         |

Formats recommandés : `.jpg`, image déjà recadrée en portrait (ratio ~4:5) pour un rendu optimal dans les cadres.

## 🎵 Ajouter une musique d'ambiance (optionnel)

Dépose un fichier `assets/audio/ambient.mp3`. Le bouton ♪ en bas de page l'activera automatiquement. Sans fichier, le bouton reste caché.

## 📝 Personnaliser le texte

Tout le contenu modifiable se trouve dans `index.html` :
- Heures de la cérémonie / réception / soirée (actuellement marquées *"à confirmer"*).
- Adresse exacte du lieu (actuellement *"Fès, Maroc — lieu exact à confirmer"*).
- Adresse e-mail du lien RSVP (actuellement `tahar.zerrioui@creditplus.ma`).
- Date limite de réponse RSVP.

## 🚀 Publier gratuitement (GitHub Pages)

1. Allez dans **Settings → Pages** du dépôt.
2. Sous **Build and deployment**, choisissez **Source : GitHub Actions**.
3. Poussez (ou fusionnez) sur la branche `main` — le workflow `.github/workflows/pages.yml` publie automatiquement le site.
4. L'URL du site apparaît dans **Settings → Pages** (ex. `https://<utilisateur>.github.io/Tahar-et-majda/`).

## 🗂️ Structure

```
index.html
assets/
  css/style.css   → styles, animations, palette, responsive
  js/main.js      → ouverture cinématique, particules, tilt 3D, countdown, RSVP
  img/            → photos (voir tableau ci-dessus)
  audio/          → musique d'ambiance optionnelle
.github/workflows/pages.yml → déploiement automatique GitHub Pages
```
