import { getUserFromCookie } from "~/server-function";

export default function User() {
  const user = getUserFromCookie();

  if (!user) {
    return (
      <a href="/api/auth/google">
        <button
          type="button"
          class="p-1 md:py-2 md:px-3 rounded border flex items-center text-sm md:gap-2 shadow active:bg-gray-100"
        >
          <img src="/google.svg" alt="Google Icon" class="h-6 w-6" />
          <span class="hidden md:block">Sign in with Google</span>
        </button>
      </a>
    );
  }

  return (
    // <div class="relative group cursor-pointer p-2">
    <div>
      <img
        src={user.image}
        alt="Profile Picture"
        class="h-8 w-8 md:w-10 md:h-10 rounded-full"
      />

      {/* 
      <div class="hidden group-hover:block absolute top-8 right-8 px-2 py-1 shadow-xl border rounded-lg bg-white text-sm">
        <p class="font-bold">
          {user.firstName} {user.lastName}
        </p>
        <p class="text-xs text-gray-600">{user.email}</p>

        <hr class="my-2" />

        <button class="w-full mx-auto my-1 flex items-center gap-2 text-md justify-center hover:underline underline-offset-4">
          Logout
        </button>
      </div> */}
    </div>
  );
}
