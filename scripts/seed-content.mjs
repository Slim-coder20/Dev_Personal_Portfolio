// Migration ponctuelle : insère le contenu texte des sections (Hero, About,
// Diplome, Contact) dans MongoDB, à partir des valeurs actuellement en dur.
// Usage : node --env-file=.env scripts/seed-content.mjs
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || "portfolio";

if (!uri) {
  console.error("MONGO_URI manquant dans l'environnement (.env)");
  process.exit(1);
}

const sections = {
  hero: {
    badge: "Software Engineer • React Specialist",
    headlineLine1: "Façonner vos projets",
    headlineHighlight: "numériques",
    headlineLine2: "avec une précision",
    headlineLine3: "absolue.",
    paragraph:
      "Slim Abida | Développeur Full-Stack MERN Passionné par la création d'expériences numériques fluides, je transforme des idées complexes en applications performantes avec React, TypeScript et Node.js. Mon exigence : l'alliance parfaite entre design et précision technique.",
    availabilityBadge: "Disponible immédiatement",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Vercel",
      "Tailwind CSS",
      "Figma",
      "Git",
      "GitHub Actions",
    ],
  },
  about: {
    badge: "A propos",
    headingLine1: "Construire l'avenir numérique,",
    headingHighlight: "bâtir un composant après l'autre.",
    paragraphs: [
      "Slim Abida | Développeur Web & Web Mobile Passionné par l'art du numérique et de la précision, je suis un développeur Full-Stack diplômé de Studi, spécialisé dans la création d'applications modernes et performantes. Mon approche repose sur une conviction simple : bâtir l'avenir numérique, un composant à la fois.",
      "Côté Frontend, j'exploite la puissance de React 19 combinée à l'agilité de Tailwind CSS pour concevoir des interfaces fluides, esthétiques et optimisées. Pour le Backend, je m'appuie sur la robustesse de Node.js, tout en maîtrisant la flexibilité de MongoDB et la rigueur de PostgreSQL.",
      "Fort de plusieurs projets concrets à mon actif, je m'attache à écrire un code maintenable et évolutif, conçu pour durer. Je suis aujourd'hui disponible pour de nouvelles missions et prêt à collaborer étroitement avec vos équipes pour donner vie à vos idées les plus ambitieuses.",
    ],
    quote:
      "Ma mission est de créer des expériences numériques qui ne soient pas seulement fonctionnelles, mais réellement agréables — des produits que les utilisateurs adorent utiliser et que les développeurs prennent plaisir à maintenir.",
    highlights: [
      {
        icon: "Code2",
        title: "Code propre",
        description: "Écrire un code maintenable et évolutif, conçu pour durer.",
      },
      {
        icon: "Rocket",
        title: "Performance",
        description:
          "Optimiser la performance pour offrir des expériences utilisateur ultra-rapides.",
      },
      {
        icon: "Users",
        title: "Collaboration",
        description:
          "Travailler en étroite collaboration avec les équipes pour donner vie aux idées.",
      },
      {
        icon: "Lightbulb",
        title: "Innovation",
        description:
          "Rester à la pointe des dernières technologies et des meilleures pratiques.",
      },
    ],
  },
  diplome: {
    badge: "Diplômes",
    headingLine1: "Mon parcours",
    headingHighlight: "Scolaire",
    paragraph:
      "Diplômé de chez Studi, j'ai consolidé mon expertise technique à travers une formation rigoureuse axée sur les réalités du marché. Ce cursus m'a permis de maîtriser l'intégralité du cycle de développement, de la conception d'architectures Full-Stack à l'optimisation de l'expérience utilisateur.",
    experiences: [
      { period: "2024 - 2025", school: "Studi", diplome: "RNCP Bac+2 DWWM" },
      { period: "2022 - 2024", school: "CRR Amiens", diplome: "DEM Musique actuel" },
      { period: "2002 - 2004", school: "Institut Pascal", diplome: "BTP PAO" },
    ],
  },
  contact: {
    badge: "Me contacter",
    headingLine1: "Bâtissons ensemble",
    headingHighlight: "de grands projets.",
    paragraph:
      "Un projet en vue ? Je suis à votre écoute. Contactez-moi pour échanger sur vos besoins et définir comment je peux vous accompagner.",
    email: "slimdev20@gmail.com",
    phone: "0607651050",
    address: "30 rue Hippolyte Mulin 92120 Montrouge",
  },
};

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("content");

  for (const [section, data] of Object.entries(sections)) {
    await collection.updateOne({ _id: section }, { $set: data }, { upsert: true });
    console.log(`Section "${section}" écrite dans "${dbName}.content".`);
  }
} finally {
  await client.close();
}
