import bcrypt from "bcryptjs";
import { createSessionCookie } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }

  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!passwordHash) {
    console.error("ADMIN_PASSWORD_HASH manquant dans l'environnement");
    res.status(500).json({ error: "Configuration admin incomplète" });
    return;
  }

  const { password } = req.body ?? {};
  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Mot de passe requis" });
    return;
  }

  const valid = await bcrypt.compare(password, passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Mot de passe incorrect" });
    return;
  }

  res.setHeader("Set-Cookie", createSessionCookie());
  res.status(200).json({ ok: true });
}
