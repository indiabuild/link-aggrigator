import { createSignal } from "solid-js";
import { UserType } from "../../db/schema";
import { Show } from "solid-js";
import { Spinner } from "~/icons/Spinner";
import { logout } from "~/server-function";

export default function UserProfile({ user }: { user: UserType }) {
  const [clicked, setClicked] = createSignal(false);

  return (
    <div class="relative group cursor-pointer">
      <img
        src={user.image}
        alt="Profile Picture"
        class="h-8 w-8 md:w-10 md:h-10 rounded-full"
      />

      <div class="hidden group-hover:block absolute top-4 right-4 shadow-xl border rounded-lg bg-white text-sm p-2">
        <p class="font-bold">
          {user.firstName} {user.lastName}
        </p>
        <p class="text-xs text-gray-600">{user.email}</p>

        <hr class="my-2" />

        <button
          class="w-full mx-auto my-1 flex items-center gap-2 text-md justify-center hover:underline underline-offset-4"
          onClick={async () => {
            setClicked(true);
            logout();
            window.location.reload();
          }}
        >
          <Show when={clicked()} fallback={<p>Logout</p>}>
            <Spinner />
          </Show>
        </button>
      </div>
    </div>
  );
}
