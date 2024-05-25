export default function GoogleLogin() {
  return (
    <a href="/api/auth/google">
      <button
        type="button"
        class="rounded border p-1 flex items-center text-sm md:gap-2 shadow active:bg-gray-100"
      >
        <img src="/google.svg" alt="Google Icon" class="h-5 w-5" />
        <span class="hidden md:block">Sign in with Google</span>
      </button>
    </a>
  );
}
