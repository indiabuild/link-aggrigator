import { useLocation } from "@solidjs/router";
import User from "./User";

export default function Nav() {
  const location = useLocation();

  const active = (path: string) =>
    path == location.pathname
      ? "border-black"
      : "border-transparent hover:border-gray-300";

  return (
    <nav class="border-b px-4 py-2">
      <div class="flex items-center justify-between mx-auto container">
        {/* 
            Branding: Logo and Icon on the Left Side of Navigation
          */}
        <a href="/" class="flex items-center gap-2">
          <img src="/foi_icon.svg" alt="Indian Flag" width={36} height={36} />
          <p class="text-xl font-bold tracking-wide">IndiaBuild</p>
          <span class="text-gray-400 text-xs text-blue-700 bg-blue-200 border rounded-xl border-blue-400 px-1 py-0 font-semibold">
            beta
          </span>
        </a>

        {/* 
            Navigations: Different pages
          */}
        <ul class="flex items-center">
          <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
            <a href="/">Home</a>
          </li>

          <li class={`border-b-2 ${active("/new")} mx-1.5 sm:mx-6`}>
            <a href="/new">New</a>
          </li>

          <li class={`border-b-2 ${active("/past")} mx-1.5 sm:mx-6`}>
            <a href="/past">Past</a>
          </li>

          <li class={`border-b-2 ${active("/ask")} mx-1.5 sm:mx-6`}>
            <a href="/ask">Ask</a>
          </li>
          <li class={`border-b-2 ${active("/comments")} mx-1.5 sm:mx-6`}>
            <a href="/comments">Comments</a>
          </li>
          <li class={`border-b-2 ${active("/submit")} mx-1.5 sm:mx-6`}>
            <a href="/submit">Submit</a>
          </li>
        </ul>
        {/* 
            User: Login, Logout and Profile
          */}
        <User />
      </div>
    </nav>
  );
}
