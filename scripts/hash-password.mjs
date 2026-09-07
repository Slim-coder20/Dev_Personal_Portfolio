// Génère le hash bcrypt à mettre dans ADMIN_PASSWORD_HASH (.env local + Vercel).
// Usage : node scripts/hash-password.mjs "MonMotDePasse"
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "MonMotDePasse"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log(hash);
