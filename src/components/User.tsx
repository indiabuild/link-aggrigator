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
              class="p-1 md:py-2 md:px-3 rounded border flex items-center text-sm md:gap-2 shadow active:bg-gray-100"
            >
              <img src="/google.svg" alt="Google Icon" class="h-6 w-6" />
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
