import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || "portfolio";

if (!uri) {
  throw new Error("Variable d'environnement MONGO_URI manquante");
}

// En environnement serverless, le module reste chaud entre invocations tant que
// l'instance de la fonction est réutilisée : on met le client en cache sur
// `global` pour éviter d'ouvrir une nouvelle connexion à chaque requête.
let cachedClientPromise = global._mongoClientPromise;

function getClientPromise() {
  if (!cachedClientPromise) {
    const client = new MongoClient(uri);
    cachedClientPromise = client.connect();
    global._mongoClientPromise = cachedClientPromise;
  }
  return cachedClientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(dbName);
}
