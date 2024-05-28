export default function GoogleLogin(props: { fullName: boolean }) {
  return (
    <a href="/api/auth/google">
      <button
        type="button"
        class="rounded border p-1 flex items-center text-sm gap-2 shadow bg-white active:shadow-xl active:translate-y-1"
      >
        <img src="/google.svg" alt="Google Icon" class="h-5 w-5" />
        <span class={`${props.fullName ? "block" : "hidden"} md:block`}>
          Login
        </span>
      </button>
    </a>
  );
}
