import { put } from "@vercel/blob";
import { isAuthenticated } from "../_lib/auth.js";

// Accepte une image encodée en data URL (base64) et la stocke sur Vercel Blob.
// Limite implicite : la taille du corps des fonctions Vercel (~4.5 Mo), donc
// une image source de quelques Mo max une fois encodée en base64.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }

  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }

  const { filename, dataUrl } = req.body ?? {};
  const match = typeof dataUrl === "string" && dataUrl.match(/^data:(.+);base64,(.*)$/);

  if (!filename || !match) {
    res.status(400).json({ error: "Fichier image invalide" });
    return;
  }

  const [, contentType, base64] = match;

  try {
    const buffer = Buffer.from(base64, "base64");
    const blob = await put(`projects/${Date.now()}-${filename}`, buffer, {
      access: "public",
      contentType,
    });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error("Erreur upload Vercel Blob:", err);
    res.status(500).json({ error: "Échec de l'upload de l'image" });
  }
}
