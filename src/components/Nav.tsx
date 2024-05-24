import { useLocation } from "@solidjs/router";
import User from "./User";

export default function Nav() {
  const location = useLocation();

  const active = (path: string) =>
    path == location.pathname
      ? "border-black"
      : "border-transparent hover:border-gray-300";

  return (
    <nav class="border-b px-2 py-2">
      <div class="flex items-center justify-between mx-auto container">
        {/* 
            Branding: Logo and Icon on the Left Side of Navigation
          */}
        <a href="/" class="flex items-center gap-2">
          <img
            src="/foi_icon.svg"
            alt="Indian Flag"
            class="w-8 h-8 md:w-10 md:h-10"
          />
          <p class="text-md md:text-xl font-bold tracking-wide">IndiaBuild</p>
          <span class="text-xs text-blue-700 bg-blue-200 border rounded-xl border-blue-400 px-1 py-0 font-semibold">
            beta
          </span>
        </a>

        {/* 
            Navigations for big Screens: Different pages
            
            Hidden on small screen
          */}
        <ul class="flex items-center hidden md:flex gap-8">
          <li class={`border-b-2 ${active("/")}`}>
            <a href="/">Home</a>
          </li>

          <li class={`border-b-2 ${active("/new")}`}>
            <a href="/new">New</a>
          </li>

          <li class={`border-b-2 ${active("/past")}`}>
            <a href="/past">Past</a>
          </li>

          <li class={`border-b-2 ${active("/ask")}`}>
            <a href="/ask">Ask</a>
          </li>
          {/* <li class={`border-b-2 ${active("/comments")}`}>
            <a href="/comments">Comments</a>
          </li> */}
          <li class={`border-b-2 ${active("/submit")}`}>
            <a href="/submit">Submit</a>
          </li>
        </ul>

        {/* 
            Navigations for small screens: Different pages
            
            Hidden on big screen
          */}
        <ul class="flex items-center fixed bottom-0 border-t justify-around w-full p-2 container md:hidden">
          <li>
            <a href="/">
              <img src="/home.svg" class="w-6" />
            </a>
          </li>

          <li>
            <a href="/new">
              <img src="/new.svg" class="w-6" />
            </a>
          </li>

          <li>
            <a href="/past">
              <img src="/past.svg" class="w-6" />
            </a>
          </li>

          <li>
            <a href="/ask">
              <img src="/ask.svg" class="w-6" />
            </a>
          </li>

          <li>
            <a href="/submit">
              <img src="/submit.svg" class="w-6" />
            </a>
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
