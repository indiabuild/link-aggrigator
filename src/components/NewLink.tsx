import { Show, Suspense, createResource, createSignal } from "solid-js";
import { getUserFromCookie } from "~/server-function";
import GoogleLogin from "./GoogleLogin";
import { Spinner } from "~/icons/Spinner";
import { redirect } from "@solidjs/router";

export default function NewLink() {
  const [user] = createResource(getUserFromCookie);
  const [clicked, setClicked] = createSignal(false);
  const [error, setError] = createSignal<string>();

  return (
    <Suspense fallback={<Spinner />}>
      <Show
        when={user()}
        fallback={
          <div class="flex flex-col gap-2 items-center">
            <p class="text-xl text-gray-600 ">Your are not logged in!</p>
            <GoogleLogin fullName={true} />
          </div>
        }
      >
        <form
          class="flex flex-col gap-2 md:w-96 w-full px-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setClicked(true);

            const formData = new FormData(e.currentTarget);

            // call api
            try {
              const res = await fetch("/api/user/submit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  url: formData.get("url"),
                  title: formData.get("title"),
                }),
              });

              if (res.status !== 200) {
                const errorMsg = await res.text();
                setError(errorMsg);
              } else {
                window.location.assign("/new");
              }
            } catch (e) {
              console.log(e);
              setError(e as string);
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
    </Suspense>
  );
}
