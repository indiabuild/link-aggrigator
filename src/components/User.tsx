import { getUserFromCookie } from "~/server-function";

export default function User() {
  let user = getUserFromCookie();

  if (!user) {
    return (
      <a href="/api/auth/google">
        <button
          type="button"
          class="p-1 md:py-2 md:px-3 rounded border flex items-center text-sm md:gap-2 shadow active:bg-gray-100"
        >
          <img src="/google.svg" alt="Google Icon" class="h-8 w-8" />
          <span class="hidden md:block">Sign in with Google</span>
        </button>
      </a>
    );
  }

  return (
    <div>
      <img
        src={user.image}
        alt="Profile Picture"
        class="w-10 h-10 rounded-full"
      />
    </div>
  );
}
