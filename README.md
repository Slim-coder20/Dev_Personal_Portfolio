# Dev Personal Portfolio

Portfolio personnel développé avec **React + Vite** et stylisé avec **Tailwind CSS**.  
Il inclut notamment une section Contact avec envoi d’emails via **EmailJS** (notification + réponse automatique).

## Stack

- **React** (front)
- **Vite** (dev server / build)
- **Tailwind CSS**
- **EmailJS** (formulaire de contact)
- **lucide-react** (icônes)
- **MongoDB** (données des projets, via une fonction serverless Vercel)

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

## Configuration MongoDB (projets)

La section `Projects` charge ses données via la fonction serverless `api/projects.js`, qui lit la collection `projects` d'une base MongoDB. Variable à ajouter dans `.env` :

```bash
MONGO_URI=mongodb+srv://...
```

Notes :
- **Ne pas préfixer par `VITE_`** : cette variable est lue uniquement côté serveur (fonction `api/`), jamais exposée au bundle client.
- En production sur Vercel, ajouter `MONGO_URI` dans Project Settings → Environment Variables.
- Pour peupler/réinitialiser la collection à partir des données de départ :

```bash
node --env-file=.env scripts/seed.mjs
```

- En local, `vite dev` seul ne sert pas les fonctions `api/`. Utiliser `vercel dev` (CLI Vercel) pour tester `/api/projects` en conditions réelles, ou se fier au déploiement (preview/production) sur Vercel.

## Structure (aperçu)

- `src/App.jsx` : point d’entrée de l’app
- `src/layout/` : layout (ex. `Navbar`, `Footer`)
- `src/section/` : sections (Hero, About, Contact, etc.)
- `src/components/` : composants réutilisables
- `api/` : fonctions serverless Vercel (ex. `api/projects.js`)
- `scripts/` : scripts ponctuels (ex. `scripts/seed.mjs`)

## Plan d’architecture

### Vue d’ensemble (flux)

- **Entrée** : `index.html` → `src/main.jsx` → `src/App.jsx`
- **Composition** : `App` assemble le layout (`src/layout/`) et les sections (`src/section/`)
- **UI réutilisable** : composants transverses dans `src/components/`
- **Contact** : `src/section/Contact.jsx` envoie les emails via EmailJS et lit les variables `VITE_EMAILJS_*`
- **Projets** : `src/section/Projects.jsx` récupère les données via `fetch("/api/projects")`, servi par la fonction serverless `api/projects.js` qui lit MongoDB (`MONGO_URI`)

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
