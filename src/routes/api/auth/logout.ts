import { AUTH_TOKEN, AUTH_USER_DATA } from "~/server-function";
import { deleteCookie } from "vinxi/http";

export function GET() {
  deleteCookie(AUTH_TOKEN);
  deleteCookie(AUTH_USER_DATA);
}
