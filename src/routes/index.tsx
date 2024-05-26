import { RouteDefinition, cache, createAsync } from "@solidjs/router";
import ContainerInner from "~/components/ContainerInner";
import { LinkTypeSelect, links } from "../../db/schema";
import db from "../../db/db";
import { Show, Suspense } from "solid-js";
import LinkBox from "~/components/LinkBox";

export default function Home() {
  return (
    <ContainerInner>
      <div class="flex flex-col md:flex-row gap-2">
        <div class="flex flex-col md:gap-8  basis-1/3 md:pr-24 p-2">
          <Options
            name="Top Categories"
            items={["Manufacturing", "AI/ML", "Internet"]}
            slug="categories"
          />
          <Options
            name="Top Tags"
            items={["semicundurcot", "python", "linear-regression"]}
            slug="tags"
          />
        </div>
        <div class="basis-2/3">
          <TopLinks />
        </div>
      </div>
    </ContainerInner>
  );
}

function Options({
  name,
  slug,
  items,
}: {
  name: string;
  slug: string;
  items: string[];
}) {
  return (
    <div class="flex flex-col gap-2 p-2">
      <p class="font-bold text-xl">{name}</p>
      <ul class="text-sm flex gap-2 flex-wrap ">
        {items.map((i) => (
          <li
            class="bg-gray-200 px-2 rounded-xl text-sm cursor-pointer  hover:bg-gray-300 active:bg-gray-400"
            onClick={() => {
              // Get the current URL parameters
              let urlParams = new URLSearchParams(window.location.search);
              // Add a new query string parameter
              urlParams.append(slug, i);
              // Generate the updated URL with the new parameter
              let updatedUrl = `${window.location.origin}${
                window.location.pathname
              }?${urlParams.toString()}`;
              // Load the window with the updated URL
              window.location.href = updatedUrl;
            }}
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

const fetchData = cache(async () => {
  "use server";

  try {
    const result: LinkTypeSelect[] = await db
      .select()
      .from(links)
      .orderBy(links.votes);

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}, "top-links-data");

export const route = {
  load: () => fetchData(),
} satisfies RouteDefinition;

function TopLinks() {
  const data = createAsync(() => fetchData());
  return (
    <div class="flex justify-center w-full overflow-y-scroll mb-16">
      <Suspense fallback="Loading...">
        <Show when={data() && data()?.length !== 0} fallback={<p>No Links</p>}>
          <ul class="w-full px-4 flex flex-col items-center">
            {data()?.map((d) => (
              <li class="mb-4">
                <LinkBox link={d} />
              </li>
            ))}
          </ul>
        </Show>
      </Suspense>
    </div>
  );
}
