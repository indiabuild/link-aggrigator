import { RouteDefinition, cache, createAsync } from "@solidjs/router";
import ContainerInner from "~/components/ContainerInner";
import db from "../../../db/db";
import { LinkTypeSelect, links } from "../../../db/schema";
import { Show, Suspense } from "solid-js";
import LinkBox from "~/components/LinkBox";
import { desc } from "drizzle-orm";

const fetchData = cache(async () => {
  "use server";

  try {
    const result: LinkTypeSelect[] = await db
      .select()
      .from(links)
      .orderBy(desc(links.createdAt));

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}, "new-links-data");

export const route = {
  load: () => fetchData(),
} satisfies RouteDefinition;

export default function NewLinks() {
  const data = createAsync(() => fetchData());

  return (
    <ContainerInner>
      <div class="flex justify-center w-full overflow-auto mb-16">
        <Suspense fallback="Loading...">
          <Show
            when={data() && data()?.length !== 0}
            fallback={<p>No Links</p>}
          >
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
    </ContainerInner>
  );
}
