export default function Home() {
  return (
    <main class="container md:px-32 md:py-8 mx-auto flex gap-2">
      <div class="flex flex-col gap-8  basis-1/3 pr-24">
        <Options
          name="Top Categories"
          items={["Manufacturing", "AI/ML", "Internet"]}
        />
        <Options
          name="Top Tags"
          items={["semicundurcot", "python", "linear-regression"]}
        />
      </div>
      <div class="basis-2/3">
        <TopLinks />
      </div>
    </main>
  );
}

function Options({ name, items }: { name: string; items: string[] }) {
  return (
    <div class="flex flex-col gap-2">
      <p class="font-bold text-xl">{name}</p>
      <ul class="text-sm flex gap-2 flex-wrap">
        {items.map((i) => (
          <li>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function TopLinks() {
  const fakeData = [{}];
  return <p>Top Links</p>;
}
