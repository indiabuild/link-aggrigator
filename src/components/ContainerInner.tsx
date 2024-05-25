// @ts-expect-error
export default function (props) {
  return (
    <main class="container md:px-32 md:py-8 py-6 mx-auto">
      {props.children}
    </main>
  );
}
