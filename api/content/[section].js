import { getDb } from "../_lib/mongodb.js";
import { isAuthenticated } from "../_lib/auth.js";

const VALID_SECTIONS = ["hero", "about", "diplome", "contact"];

export default async function handler(req, res) {
  const { section } = req.query;

  if (!VALID_SECTIONS.includes(section)) {
    res.status(404).json({ error: "Section inconnue" });
    return;
  }

  try {
    const db = await getDb();
    const collection = db.collection("content");

    if (req.method === "GET") {
      const doc = await collection.findOne({ _id: section });
      res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
      if (!doc) {
        res.status(200).json(null);
        return;
      }
      const { _id, ...rest } = doc;
      res.status(200).json(rest);
      return;
    }

    if (!isAuthenticated(req)) {
      res.status(401).json({ error: "Non authentifié" });
      return;
    }

    if (req.method === "PUT") {
      const updates = { ...(req.body ?? {}) };
      delete updates._id;
      await collection.updateOne({ _id: section }, { $set: updates }, { upsert: true });
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader("Allow", "GET, PUT");
    res.status(405).json({ error: "Méthode non autorisée" });
  } catch (err) {
    console.error(`Erreur /api/content/${section}:`, err);
    res.status(500).json({ error: "Impossible de traiter la requête" });
  }
}
