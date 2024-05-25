import { cache, createAsync } from "@solidjs/router";
import { getUserFromCookie } from "~/server-function";

const getUser = cache(async () => {
  "use server";
  return getUserFromCookie();
}, "users");

export const route = {
  load: () => getUser(),
};

export default function NewLink() {
  const user = createAsync(() => getUser());

  if (!user()) {
    return <p>Login First</p>;
  }

  return <p>New Link</p>;
}
