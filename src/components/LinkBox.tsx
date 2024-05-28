import { UpVote, UpVoteGreen } from "~/icons/Spinner";
import { LinkTypeSelect, links } from "../../db/schema";
import { viewsVotesData } from "~/server-function";
import { createAsync } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import db from "../../db/db";
import { eq } from "drizzle-orm";

export default function LinkBox({
  link,
  userId,
}: {
  link: LinkTypeSelect;
  userId?: string;
}) {
  const [views, setViews] = createSignal<number>();
  const [upVote, setupVote] = createSignal(false);
  const [votes, setVotes] = createSignal<number>();
  const data = createAsync(() => viewsVotesData(link.id));

  createEffect(() => {
    setViews(data()?.views);
    setVotes(data()?.votes);
  });

  return (
    <div class="border p-2 lg:p-4 md:w-[42rem] rounded-md bg-gray-100 shadow flex flex-col md:flex-row justify-between items-end md:items-center gap-2 md:gap-6">
      <div class="flex flex-col gap-1 md:gap-2">
        <a
          target="_black"
          href={link.url}
          class="hover:underline underline-offset-4 font-semibold text-sm md:text-lg visited:text-gray-500 "
          // @ts-expect-error
          onClick={() => setViews((v) => v + 1)}
        >
          {link.title}
        </a>
        <div class="text-xs text-gray-400 flex gap-1 md:gap-4 flex-wrap">
          <span>{link.host}</span>
          <span>•</span>
          <span>by User</span>
          <span>•</span>
          <span>on {link.createdAt.toDateString()}</span>
          <span>•</span>
          <span>views {views()}</span>
        </div>
      </div>
      <button
        class="group flex flex-col items-center justify-center cursor-pointer text-sm"
        onClick={async () => {
          const alreadyUpVoted = upVote();
          setupVote((u) => !u);

          if (alreadyUpVoted) {
            // @ts-expect-error
            setVotes((v) => v - 1);
            await decrVotes(link.id);
          } else {
            // @ts-expect-error
            setVotes((v) => v + 1);
            await incrementVotes(link.id);
          }
        }}
      >
        {upVote() ? <UpVoteGreen /> : <UpVote />}
        <p
          class={`text-xs ${
            upVote() ? "text-green-500 font-bold" : "text-black"
          }`}
        >
          {votes()}
        </p>
      </button>
    </div>
  );
}

async function incrementVotes(id: string) {
  "use server";

  try {
    const currentVotes = await db
      .select({
        votes: links.votes,
      })
      .from(links)
      .where(eq(links.id, id));

    await db
      .update(links)
      .set({
        votes: currentVotes[0].votes + 1,
      })
      .where(eq(links.id, id));
  } catch (e) {
    console.log(e);
  }
}

async function decrVotes(id: string) {
  "use server";

  try {
    const currentVotes = await db
      .select({
        votes: links.votes,
      })
      .from(links)
      .where(eq(links.id, id));

    await db
      .update(links)
      .set({
        votes: currentVotes[0].votes - 1,
      })
      .where(eq(links.id, id));
  } catch (e) {
    console.log(e);
  }
}

async function incrementViews(id: string) {
  "use server";

  try {
    const currentViews = await db
      .select({
        views: links.views,
      })
      .from(links)
      .where(eq(links.id, id));

    await db
      .update(links)
      .set({
        views: currentViews[0].views + 1,
      })
      .where(eq(links.id, id));
  } catch (e) {
    console.log(e);
  }
}
