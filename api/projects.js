import { getDb } from "./_lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }

  try {
    const db = await getDb();
    const projects = await db
      .collection("projects")
      .find({}, { projection: { _id: 0 } })
      .sort({ order: 1 })
      .toArray();

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(projects);
  } catch (err) {
    console.error("Erreur /api/projects:", err);
    res.status(500).json({ error: "Impossible de récupérer les projets" });
  }
}
