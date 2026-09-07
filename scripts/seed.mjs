// Script de migration ponctuelle : insère les projets (repris de l'ancien
// tableau statique de src/section/Projects.jsx) dans MongoDB.
// Usage : node --env-file=.env scripts/seed.mjs
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || "portfolio";

if (!uri) {
  console.error("MONGO_URI manquant dans l'environnement (.env)");
  process.exit(1);
}

const projects = [
  {
    order: 1,
    title: "Amazone-clone",
    description:
      "Application web e-commerce inspirée d'Amazon : authentification Firebase, panier, checkout et paiement en ligne via Stripe.",
    image: "/projects/project1.png",
    tags: ["React", "React Router 7", "Node.js", "Firebase", "Stripe"],
    link: "https://e-clone-f1b94.web.app/",
    github: "https://github.com/Slim-coder20/amazone-clone.git",
  },
  {
    order: 2,
    title: "Vite&Gouramnd",
    description:
      "Application web full-stack permettant aux clients de commander des repas en ligne, avec des espaces dédiés pour les clients, employés et administrateurs.",
    image: "/projects/project2.png",
    tags: ["React", "CSS", "Node.js", "Supabase", "MongoDB", "Docker"],
    link: "https://vite-gourmand.vercel.app/",
    github: "https://github.com/Slim-coder20/vite-gourmand.git",
  },
  {
    order: 3,
    title: "FoodStore",
    description:
      "Application e-commerce alimentaire full-stack avec une interface client (acheteurs) et une interface vendeur (gestion des produits et commandes).",
    image: "/projects/project3.png",
    tags: [
      "React",
      "React-hook-form",
      "Tailwindcss",
      "Node.js",
      "MongoDB",
      "Stripe",
      "JWT",
      "Multer",
      "Cloudinary",
    ],
    link: "https://foodstorefront.vercel.app",
    github: "https://github.com/Slim-coder20/greenCart-.git",
  },
  {
    order: 4,
    title: "Website Artist - Slim Abida",
    description:
      "Site web officiel de Slim Abida avec système de e-commerce intégré pour la vente d'albums, système de traduction FR/EN, et gestion dynamique du contenu.",
    image: "/projects/project4.png",
    tags: [
      "Next.js15",
      "TypeScript",
      "CSS Modules",
      "React Context API",
      "Prisma",
      "Postgres",
      "Supabase",
    ],
    link: "https://www.slimabida.fr/",
    github: "https://github.com/Slim-coder20/my-web-site.git",
  },
  {
    order: 5,
    title: "Tunzik Production - Association de spectacle vivant",
    description:
      "Site web de Tunzik Production, association d'aide au spectacle vivant basée à Paris depuis 2017. La plateforme présente les artistes du label, leur discographie, et permet aux visiteurs de devenir adhérents ou de contacter l'association",
    image: "/projects/tunzikProd.png",
    tags: [
      "React 19",
      "Tailwindcss",
      "React Context API",
      "MongoDB",
      "Vercel",
      "Render",
    ],
    link: "https://tunzik-prod.vercel.app/",
    github: "https://github.com/Slim-coder20/tunzikProd.git",
  },
  {
    order: 6,
    title: "Chatbot AI - Une mini application de chat IA",
    description:
      "Une application de chatbot interactif utilisant l'API OpenAI GPT-4o pour créer une expérience de conversation fluide et intuitive.",
    image: "/projects/chatbot.png",
    tags: ["HTML", "CSS", "OPENAI API", "JavaScript", "Vercel"],
    link: "https://chatbot-ia-topaz.vercel.app/",
    github: "https://github.com/Slim-coder20/chatbot_IA-.git",
  },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("projects");

  const existing = await collection.countDocuments();
  if (existing > 0) {
    console.log(
      `La collection "projects" contient déjà ${existing} document(s). Suppression avant réinsertion...`,
    );
    await collection.deleteMany({});
  }

  const result = await collection.insertMany(projects);
  console.log(`${result.insertedCount} projets insérés dans "${dbName}.projects".`);
} finally {
  await client.close();
}
