import { AUTH_TOKEN, AUTH_USER_DATA } from "~/server-function";
import type { APIEvent } from "@solidjs/start/server";
import { deleteCookie } from "vinxi/http";

export function GET({ request }: APIEvent) {
  const url = new URL(request.url as string);

  deleteCookie(AUTH_TOKEN);
  deleteCookie(AUTH_USER_DATA);
}
