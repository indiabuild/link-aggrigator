import { UpVote, UpVoteGreen } from "~/icons/Spinner";
import { LinkTypeSelect, links, userUpvoteLink } from "../../db/schema";
import { getUserFromCookie, viewsVotesData } from "~/server-function";
import { createAsync } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import db from "../../db/db";
import { and, eq, sql } from "drizzle-orm";

export default function LinkBox({
  link,
  userId,
}: {
  link: LinkTypeSelect;
  userId: string;
}) {
  const [currentUser] = createResource(getUserFromCookie);
  const [views, setViews] = createSignal<number>();
  const [upVote, setupVote] = createSignal<boolean | undefined>();
  const [votes, setVotes] = createSignal<number>();
  const data = createAsync(() => viewsVotesData(link.id));

  createEffect(async () => {
    setViews(data()?.views);
    setVotes(data()?.votes);

    try {
      if (!currentUser()) return;

      const userAlreadyUpvoted = await checkUserUpVotes(
        link.id,
        // @ts-expect-error
        currentUser().id
      );
      setupVote(userAlreadyUpvoted);
    } catch (e) {
      console.log(e);
    }
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
          {link.userName && <span>by {link.userName}</span>}
          <span>on {link.createdAt.toDateString()}</span>
          <span>views {views()}</span>
        </div>
      </div>
      <button
        class={`group flex flex-col items-center justify-center cursor-pointer text-sm ${
          upVote() === undefined && "disable invisible"
        }`}
        onClick={async () => {
          if (!currentUser()) return;

          const alreadyUpVoted = upVote();
          setupVote((u) => !u);

          if (alreadyUpVoted) {
            // @ts-expect-error
            setVotes((v) => v - 1);

            Promise.all([
              decrVotes(link.id),
              // @ts-expect-error
              removeUserUpVote(link.id, currentUser().id),
            ]);
          } else {
            // @ts-expect-error
            setVotes((v) => v + 1);

            Promise.all([
              incrementVotes(link.id),
              // @ts-expect-error
              addUserUpVote(link.id, currentUser().id),
            ]);
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

async function checkUserUpVotes(linkID: string, userID: string) {
  "use server";

  try {
    const result = await db
      .select({
        userID: userUpvoteLink.userID,
      })
      .from(userUpvoteLink)
      .where(
        and(
          eq(userUpvoteLink.linkID, linkID),
          eq(userUpvoteLink.userID, userID)
        )
      );

    return result.length === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function addUserUpVote(linkID: string, userID: string) {
  "use server";

  try {
    await db.insert(userUpvoteLink).values({
      userID,
      linkID,
      createdAt: sql`now()`,
    });
  } catch (e) {
    console.log(e);
  }
}

async function removeUserUpVote(linkID: string, userID: string) {
  "use server";

  try {
    await db
      .delete(userUpvoteLink)
      .where(
        and(
          eq(userUpvoteLink.linkID, linkID),
          eq(userUpvoteLink.userID, userID)
        )
      );
  } catch (e) {
    console.log(e);
  }
}
