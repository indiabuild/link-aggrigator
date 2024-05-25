import { Show, createResource } from "solid-js";
import { UserType } from "../../db/schema";
import { getUserFromCookie } from "~/server-function";
import UserProfile from "./UserProfile";

export default function User() {
  const [data] = createResource(getUserFromCookie);

  return (
    <Show
      when={data()}
      fallback={
        <a href="/api/auth/google">
          <button
            type="button"
            class="rounded border p-1 flex items-center text-sm md:gap-2 shadow active:bg-gray-100"
          >
            <img src="/google.svg" alt="Google Icon" class="h-5 w-5" />
            <span class="hidden md:block">Sign in with Google</span>
          </button>
        </a>
      }
    >
      <UserProfile user={data() as UserType} />
    </Show>
  );
}
