import { UserType } from "../../db/schema";

export default function UserProfile({ user }: { user: UserType }) {
  return (
    <div class="relative group cursor-pointer">
      <img
        src={user.image}
        alt="Profile Picture"
        class="h-8 w-8 md:w-10 md:h-10 rounded-full"
      />

      <div class="hidden group-hover:block absolute top-8 right-8 shadow-xl border rounded-lg bg-white text-sm p-2">
        <p class="font-bold">
          {user.firstName} {user.lastName}
        </p>
        <p class="text-xs text-gray-600">{user.email}</p>

        <hr class="my-2" />

        <button
          class="w-full mx-auto my-1 flex items-center gap-2 text-md justify-center hover:underline underline-offset-4"
          onClick={async () => {
            "use client";
            try {
              await fetch("/api/auth/logout");
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
