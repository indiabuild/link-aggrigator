import ContainerInner from "./ContainerInner";

// @ts-expect-error
export default function FilterLists(props) {
  return (
    <ContainerInner>
      <div class="flex flex-col md:flex-row gap-2">
        <div class="flex flex-col md:gap-8  basis-1/3 md:pr-2 lg:pr-24 p-2">
          <Options
            name="Top Categories"
            items={["Manufacturing", "AI/ML", "Internet"]}
            slug="categories"
          />
          <Options
            name="Top Tags"
            items={["semiconductors", "python", "linear-regression"]}
            slug="tags"
          />
          <div class="hidden md:block">
            <img
              src="/banner.webp"
              alt="IndiaBuild Banner"
              class="rounded shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
            />
            <div class="flex gap-4 mt-4">
              <a href="https://discord.com/invite/indiabuild-building-india-s-future-1069614588133396552">
                <img src="/discord.svg" alt="discord logo" width={40} />
              </a>
              <a href="https://x.com/i/communities/1669220055907811330">
                <img src="/x.png" alt="Twitter logo" width={35} />
              </a>
              <a href="https://github.com/indiabuild">
                <img src="/github.svg" alt="Github logo" width={35} />
              </a>
            </div>
          </div>
        </div>
        <div class="basis-2/3">{props.children}</div>
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
