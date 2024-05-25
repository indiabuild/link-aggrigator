import { getCookie } from "vinxi/http";
import { UserType } from "../db/schema";

export const AUTH_USER_DATA = "user-data";
export const AUTH_TOKEN = "auth-token";

export function getUserFromCookie(): UserType | null {
  "use server";
  const user = getCookie(AUTH_USER_DATA);

  if (!user) {
    return null;
  }

  try {
    const u: UserType = JSON.parse(user);
    return u;
  } catch (e) {
    console.log(e);
    return null;
  }
}
