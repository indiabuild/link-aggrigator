import { getCookie } from "vinxi/http";
import { UserType } from "../db/schema";

export const AUTH_USER_DATA = "user-data";
export const AUTH_TOKEN = "auth-token";

export function getUserFromCookie(): UserType {
  "use server";
  const user = getCookie(AUTH_USER_DATA);

  if (!user) {
    throw new Error("not user data in cookie");
  }

  return JSON.parse(user);
}
