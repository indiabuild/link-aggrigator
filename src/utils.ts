import jwt from "jsonwebtoken";
import { getCookie } from "vinxi/http";
import { AUTH_TOKEN } from "./server-function";

type SessionSecret = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export async function getIDFromJWT() {
  "use server";
  const token = getCookie(AUTH_TOKEN);

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as string;
    // @ts-expect-error
    return decoded["id"] as string;
  } catch (e) {
    console.log(e);
    return null;
  }
}
