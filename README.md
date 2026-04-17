# Dev Personal Portfolio

Portfolio personnel développé avec **React + Vite** et stylisé avec **Tailwind CSS**.  
Il inclut notamment une section Contact avec envoi d’emails via **EmailJS** (notification + réponse automatique).

## Stack

- **React** (front)
- **Vite** (dev server / build)
- **Tailwind CSS**
- **EmailJS** (formulaire de contact)
- **lucide-react** (icônes)

## Prérequis

- **Node.js** (LTS recommandé)
- **npm**

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Puis ouvre l’URL indiquée dans le terminal (généralement `http://localhost:5173`).

## Build / Preview

```bash
# build de production
npm run build

# prévisualisation du build
npm run preview
```

## Lint

```bash
npm run lint
```

## Configuration EmailJS (formulaire de contact)

La section `Contact` lit ces variables d’environnement :

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID` (template de notification admin)
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID` (template de réponse automatique)

Crée un fichier `.env` à la racine du projet :

```bash
VITE_EMAILJS_SERVICE_ID=xxxx
VITE_EMAILJS_TEMPLATE_ID=xxxx
VITE_EMAILJS_PUBLIC_KEY=xxxx
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=xxxx
```

Notes :
- Les variables **doivent** commencer par `VITE_` pour être exposées côté client avec Vite.
- Ne commit pas ton `.env` (il doit rester local).

## Structure (aperçu)

- `src/App.jsx` : point d’entrée de l’app
- `src/layout/` : layout (ex. `Navbar`, `Footer`)
- `src/section/` : sections (Hero, About, Contact, etc.)
- `src/components/` : composants réutilisables

## Plan d’architecture

### Vue d’ensemble (flux)

- **Entrée** : `index.html` → `src/main.jsx` → `src/App.jsx`
- **Composition** : `App` assemble le layout (`src/layout/`) et les sections (`src/section/`)
- **UI réutilisable** : composants transverses dans `src/components/`
- **Contact** : `src/section/Contact.jsx` envoie les emails via EmailJS et lit les variables `VITE_EMAILJS_*`

### Arborescence (simplifiée)

```text
.
├── index.html
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── assets/
    ├── components/
    │   ├── Button.jsx
    │   └── AnimatedBorderButton.jsx
    ├── layout/
    │   ├── Navbar.jsx
    │   └── Footer.jsx
    └── section/
        ├── Hero.jsx
        ├── About.jsx
        └── Contact.jsx
```

## Déploiement

Ce projet est un site statique (SPA). Tu peux le déployer sur Vercel, Netlify, GitHub Pages, etc.

1. Build :

```bash
npm run build
```

2. Déploie le dossier `dist/`.

3. Configure tes variables EmailJS dans l’UI du provider (variables d’environnement du projet) si nécessaire.
