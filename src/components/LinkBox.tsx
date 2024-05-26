import { UpVote } from "~/icons/Spinner";
import { LinkTypeSelect } from "../../db/schema";
import { createSignal, onMount } from "solid-js";

export default function LinkBox({ link }: { link: LinkTypeSelect }) {
  const [views, setViews] = createSignal(0);
  const [votes, setVotes] = createSignal(0);

  onMount(() => {
    setViews(link.views);
    setVotes(link.votes);
  });

  return (
    <div class="border p-2 md:p-4 md:w-[42rem] rounded-md bg-gray-100 shadow flex flex-col md:flex-row justify-between items-end md:items-center gap-2 md:gap-6">
      <div class="flex flex-col gap-1 md:gap-2">
        <a
          target="_black"
          href={link.url}
          class="hover:underline underline-offset-4 font-semibold text-sm md:text-lg visited:text-gray-500 "
          onClick={() => {
            setViews((v) => v + 1);
          }}
        >
          {link.title}
        </a>
        <div class="text-xs text-gray-400 flex gap-1 md:gap-4 flex-wrap">
          <span>{link.host}</span>
          <span>•</span>
          <span>by Kunal Singh</span>
          <span>•</span>
          <span>on {link.createdAt.toDateString()}</span>
          <span>•</span>
          <span>views {views()}</span>
        </div>
      </div>
      <button
        class="group flex flex-col items-center justify-center cursor-pointer text-sm"
        onClick={() => {
          setVotes((v) => v + 1);
        }}
      >
        <UpVote />
        <p class="text-xs">{votes()}</p>
      </button>
    </div>
  );
}
