import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-4xl  font-semibold uppercase my-16">
        This feature is not yet implemented!
      </h1>

      <A href="/" class="hover:underline underline-offset-4">
        &larr; Go to Home
      </A>
    </main>
  );
}
