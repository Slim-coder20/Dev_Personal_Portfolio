import jwt from "jsonwebtoken";
import { stringifySetCookie, parseCookie } from "cookie";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Variable d'environnement JWT_SECRET manquante");
  }
  return secret;
}

export function createSessionCookie() {
  const token = jwt.sign({ role: "admin" }, getSecret(), { expiresIn: MAX_AGE });
  return stringifySetCookie({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearSessionCookie() {
  return stringifySetCookie({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export function isAuthenticated(req) {
  const cookies = parseCookie(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME];
  if (!token) return false;
  try {
    jwt.verify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
