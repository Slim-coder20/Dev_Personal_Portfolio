import { ObjectId } from "mongodb";
import { getDb } from "./_lib/mongodb.js";
import { isAuthenticated } from "./_lib/auth.js";

function serialize(doc) {
  const { _id, ...rest } = doc;
  return { _id: _id.toString(), ...rest };
}

export default async function handler(req, res) {
  let collection;
  try {
    const db = await getDb();
    collection = db.collection("projects");
  } catch (err) {
    console.error("Erreur de connexion MongoDB:", err);
    res.status(500).json({ error: "Impossible de contacter la base de données" });
    return;
  }

  try {
    if (req.method === "GET") {
      const projects = await collection.find({}).sort({ order: 1 }).toArray();
      res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
      res.status(200).json(projects.map(serialize));
      return;
    }

    // Toutes les écritures nécessitent une session admin valide.
    if (!isAuthenticated(req)) {
      res.status(401).json({ error: "Non authentifié" });
      return;
    }

    if (req.method === "POST") {
      const { title, description, image, tags, link, github } = req.body ?? {};
      if (!title || !description) {
        res.status(400).json({ error: "Titre et description requis" });
        return;
      }

      const [last] = await collection.find().sort({ order: -1 }).limit(1).toArray();
      const doc = {
        title,
        description,
        image: image ?? "",
        tags: Array.isArray(tags) ? tags : [],
        link: link ?? "",
        github: github ?? "",
        order: (last?.order ?? 0) + 1,
      };

      const result = await collection.insertOne(doc);
      res.status(201).json(serialize({ _id: result.insertedId, ...doc }));
      return;
    }

    if (req.method === "PUT") {
      const { id, _id, ...updates } = req.body ?? {};
      if (!id || !ObjectId.isValid(id)) {
        res.status(400).json({ error: "Identifiant de projet invalide" });
        return;
      }

      delete updates.id;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updates },
      );
      if (result.matchedCount === 0) {
        res.status(404).json({ error: "Projet introuvable" });
        return;
      }
      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === "DELETE") {
      const id = req.query?.id;
      if (!id || !ObjectId.isValid(id)) {
        res.status(400).json({ error: "Identifiant de projet invalide" });
        return;
      }

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Projet introuvable" });
        return;
      }
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    res.status(405).json({ error: "Méthode non autorisée" });
  } catch (err) {
    console.error("Erreur /api/projects:", err);
    res.status(500).json({ error: "Impossible de traiter la requête" });
  }
}
