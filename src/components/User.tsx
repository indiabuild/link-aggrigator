import { Show, createSignal, onMount } from "solid-js";
import { UserType } from "../../db/schema";
import { getUserFromCookie } from "~/server-function";
import UserProfile from "./UserProfile";

export default function User() {
  const [user, setUser] = createSignal<UserType | null>(null);

  onMount(async () => {
    const u = getUserFromCookie();
    // in client this is promise thats why await
    setUser(await u);
  });

  return (
    <div>
      <Show
        when={user()}
        fallback={
          <a href="/api/auth/google">
            <button
              type="button"
              class="rounded border p-1 px-2 flex items-center text-sm md:gap-2 shadow active:bg-gray-100"
            >
              <img src="/google.svg" alt="Google Icon" class="h-5 w-5" />
              <span class="hidden md:block">Sign in with Google</span>
            </button>
          </a>
        }
      >
        <UserProfile user={user() as UserType} />
      </Show>
    </div>
  );
}
