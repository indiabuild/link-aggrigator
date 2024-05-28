import { Show, Suspense, createResource, createSignal } from "solid-js";
import { getUserFromCookie } from "~/server-function";
import GoogleLogin from "./GoogleLogin";
import { Spinner } from "~/icons/Spinner";
import db from "../../db/db";
import { links } from "../../db/schema";
import { uuidv7 } from "uuidv7";
import { sql } from "drizzle-orm";

export default function NewLink() {
  const [user] = createResource(getUserFromCookie);
  const [clicked, setClicked] = createSignal(false);
  const [error, setError] = createSignal<string>();

  return (
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
          if (!user()) return;
          e.preventDefault();
          setClicked(true);

          const formData = new FormData(e.currentTarget);

          try {
            await addNewLink(
              formData.get("url")?.toString() as string,
              formData.get("title")?.toString() as string,
              // @ts-expect-error
              user().id,
              // @ts-expect-error
              `${user().firstName} ${user().lastName}`
            );
          } catch (e) {
            setError(e as string);
          }

          window.location.assign("/new");
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
  );
}

async function addNewLink(
  url: string,
  title: string,
  userID: string,
  userName: string
) {
  "use server";

  await db.insert(links).values({
    id: uuidv7(),
    url,
    title,
    host: new URL(url).host,
    userID,
    userName,
    createdAt: sql`now()`,
    updatedAt: sql`now()`,
  });
}
