export default function User() {
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
