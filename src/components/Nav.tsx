import { useLocation } from "@solidjs/router";
import { A } from "@solidjs/router";
import User from "./User";
import { Suspense } from "solid-js";

export default function Nav() {
  const location = useLocation();

  const active = (path: string) =>
    path == location.pathname
      ? "border-black"
      : "border-transparent hover:border-gray-300";

  const activeIcon = (path: string) =>
    path == location.pathname && "bg-cyan-200 rounded-full";

  return (
    <nav>
      <div class="border-b px-2 py-3">
        <div class="relative flex items-center justify-between mx-auto container">
          {/* 
            Branding: Logo and Icon on the Left Side of Navigation
          */}
          <A href="/" class="flex items-center gap-2">
            <img
              src="/foi_icon.svg"
              alt="Indian Flag"
              class="w-8 h-8 md:w-10 md:h-10"
            />
            <p class="text-lg md:text-xl font-bold tracking-wide">IndiaBuild</p>
            <span class="text-xs text-purple-700 bg-purple-200 border rounded-xl border-purple-400 px-1 py-0 font-semibold">
              dev release
            </span>
          </A>

          {/* 
            Navigations for big Screens: Different pages
            
            Hidden on small screen
          */}
          <ul class="flex items-center hidden md:flex gap-8 absolute left-[50%] transform -translate-x-1/2">
            <li class={`border-b-2 ${active("/")}`}>
              <A href="/">Home</A>
            </li>

            <li class={`border-b-2 ${active("/new")}`}>
              <A href="/new">New</A>
            </li>

            <li class={`border-b-2 ${active("/past")}`}>
              <A href="/past">Past</A>
            </li>

            <li class={`border-b-2 ${active("/Ask")}`}>
              <A href="/Ask">Ask</A>
            </li>
            {/* <li class={`border-b-2 ${Active("/comments")}`}>
            <A href="/comments">Comments</A>
          </li> */}
            <li class={`border-b-2 ${active("/submit")}`}>
              <A href="/submit">Submit</A>
            </li>
          </ul>

          {/* 
            User: Login, Logout and Profile
          */}
          <User />
        </div>
      </div>
      {/* 
            Navigations for small screens: Different pages
            
            Hidden on big screen
          */}
      <ul class="flex px-2 py-3 items-center fixed bottom-0 border-t justify-around w-full container md:hidden bg-white">
        <li>
          <A href="/">
            <img src="/home.svg" class={`w-6 ${activeIcon("/")}`} />
          </A>
        </li>

        <li>
          <A href="/new">
            <img src="/new.svg" class={`w-6 ${activeIcon("/new")}`} />
          </A>
        </li>

        <li>
          <A href="/past">
            <img src="/past.svg" class={`w-6 ${activeIcon("/past")}`} />
          </A>
        </li>

        <li>
          <A href="/ask">
            <img src="/ask.svg" class={`w-6 ${activeIcon("/ask")}`} />
          </A>
        </li>

        <li>
          <A href="/submit">
            <img src="/submit.svg" class={`w-6 ${activeIcon("/submit")}`} />
          </A>
        </li>
      </ul>
    </nav>
  );
}
