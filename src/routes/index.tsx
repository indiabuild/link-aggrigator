import { RouteDefinition, cache, createAsync } from "@solidjs/router";
import db from "../../db/db";
import { Show, Suspense } from "solid-js";
import LinkBox from "~/components/LinkBox";
import { desc } from "drizzle-orm";
import FilterLists from "~/components/FilterLists";
import { links } from "../../db/schema";

export default function Home() {
  return (
    <FilterLists>
      <TopLinks />
    </FilterLists>
  );
}

const fetchData = cache(async () => {
  "use server";

  try {
    const result = await db.select().from(links).orderBy(desc(links.votes));
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
    <div class="flex justify-center w-full overflow-auto mb-16">
      <Suspense fallback="Loading...">
        <Show when={data() && data()?.length !== 0} fallback={<p>No Links</p>}>
          <ul class="w-full px-4 flex flex-col items-center">
            {data()?.map((d) => (
              <li class="mb-4">
                <LinkBox link={d} userId={d.userID} />
              </li>
            ))}
          </ul>
        </Show>
      </Suspense>
    </div>
  );
}
