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
- **react-router-dom** (routing, y compris l'espace `/admin`)

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

## Espace admin (`/admin`)

Un espace `/admin` protégé par mot de passe permet de gérer le contenu du site (phase 2 : CRUD des projets + upload d'images ; les autres sections du site viendront ensuite).

Variables à ajouter dans `.env` (jamais préfixées `VITE_`, lues uniquement côté serveur) :

```bash
JWT_SECRET=une-chaine-aleatoire-longue
ADMIN_PASSWORD_HASH=$2b$12$...
```

- Générer `JWT_SECRET` (une seule fois, à garder identique entre local et prod) :

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

- Générer `ADMIN_PASSWORD_HASH` à partir du mot de passe de ton choix (jamais stocké en clair) :

```bash
node scripts/hash-password.mjs "TonMotDePasse"
```

- Ajouter les deux variables dans Vercel → Project Settings → Environment Variables (Production **et** Preview si besoin) avant de déployer.
- Routes : `/admin/login` (formulaire), `/admin` (dashboard, redirige vers `/admin/login` si non connecté). API : `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/admin/me`.

### Gestion des projets (CRUD)

Depuis `/admin`, on peut créer, éditer et supprimer des projets (formulaire avec upload d'image directement dans le dashboard, plus besoin de passer par MongoDB Atlas ou de committer une image dans `public/projects/`).

- `GET /api/projects` reste public (site) ; `POST` / `PUT` / `DELETE` nécessitent la session admin.
- `POST /api/admin/upload` reçoit une image (encodée en base64 depuis le navigateur) et la stocke sur **Vercel Blob**, protégé par la session admin.

**Prérequis Vercel Blob** (à faire une seule fois, dans le dashboard Vercel — pas via ce dépôt) :
1. Vercel → ton projet → onglet **Storage** → **Create Database** → **Blob**
2. Une fois créé, lie le store au projet — Vercel injecte automatiquement la variable `BLOB_READ_WRITE_TOKEN` dans les Environment Variables
3. Redéployer pour que la variable soit prise en compte

Sans ce store Blob créé, l'upload d'image échouera (`BLOB_READ_WRITE_TOKEN` manquant) — le reste de l'admin (texte, tags, liens) fonctionne malgré tout, il suffit dans ce cas de coller une URL d'image existante dans le champ prévu à cet effet plutôt que d'utiliser l'upload.

Limite à connaître : le corps d'une fonction Vercel est limité à ~4.5 Mo, donc une image source de quelques Mo maximum une fois encodée en base64.

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
