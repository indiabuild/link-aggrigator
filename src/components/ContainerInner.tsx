// @ts-expect-error
export default function (props) {
  return (
    <main class="container md:px-0 lg:px-32  md:py-4 lg:py-8 py-4 mx-auto">
      {props.children}
    </main>
  );
}
