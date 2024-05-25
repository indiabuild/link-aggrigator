import ContainerInner from "~/components/ContainerInner";

export default function Home() {
  return (
    <ContainerInner>
      <div class="flex gap-2">
        <div class="flex flex-col gap-8  basis-1/3 pr-24">
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
    <div class="flex flex-col gap-2">
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

function TopLinks() {
  const fakeData = [{}];
  return <p>Top Links</p>;
}
