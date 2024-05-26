import { Show, createResource } from "solid-js";
import { UserType } from "../../db/schema";
import { getUserFromCookie } from "~/server-function";
import UserProfile from "./UserProfile";
import GoogleLogin from "./GoogleLogin";

export default function User() {
  const [data] = createResource(getUserFromCookie);

  return (
    <Show when={data()} fallback={<GoogleLogin fullName={false} />}>
      <UserProfile user={data() as UserType} />
    </Show>
  );
}
