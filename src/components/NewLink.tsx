import { Show, createResource, createSignal } from "solid-js";
import { getUserFromCookie } from "~/server-function";
import GoogleLogin from "./GoogleLogin";
import { Spinner } from "~/icons/Spinner";
import { redirect } from "@solidjs/router";

export default function NewLink() {
  const [user] = createResource(getUserFromCookie);
  const [clicked, setClicked] = createSignal(false);
  const [url, setURL] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [error, setError] = createSignal<string>();

  return (
    <Show
      when={user()}
      fallback={
        <div class="flex flex-col gap-2 items-center">
          <p class="text-xl text-gray-600 ">Your are not logged in!</p>
          <GoogleLogin />
        </div>
      }
    >
      <form
        class="flex flex-col gap-2 md:w-96 w-full px-4"
        onsubmit={async (e) => {
          e.preventDefault();
          setClicked(true);

          // todo: check if url and title not null

          // call api
          try {
            const res = await fetch("/api/user/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url: url(),
                title: title(),
              }),
            });

            if (res.status !== 200) {
              const errorMsg = await res.text();
              setError(errorMsg);
            }

            window.location.assign("/new");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div>
          <label for="url" class="font-bold">
            URL
          </label>
          <br />
          <input
            name="url"
            type="url"
            required
            class="border rounded w-full px-2"
            placeholder="https://punkx.org/rocksolid/"
            value={url()}
            onChange={(e) => setURL(e.target.value)}
          />
        </div>
        <div>
          <label for="title" class="font-bold">
            Title
          </label>
          <br />
          <textarea
            name="title"
            required
            class="border rounded w-full px-2"
            placeholder="Rock Solid: egg drop challenge, fastest egg wins."
            value={title()}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button
          type="submit"
          class="border p-2 rounded-lg shadow bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex justify-center"
        >
          {clicked() ? <Spinner /> : "Submit"}
        </button>
        <p class="text-red-500">{error()}</p>
      </form>
    </Show>
  );
}
