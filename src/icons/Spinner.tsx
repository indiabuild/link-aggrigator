export function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.4em"
      height="1.4em"
      viewBox="0 0 24 24"
      class="invert dark:invert-0"
    >
      <path
        fill="black"
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity={0.25}
      ></path>
      <path
        fill="black"
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </path>
    </svg>
  );
}

export const UpVote = () => (
  <svg
    viewBox="0 0 512 512"
    width="1.4em"
    height="1.4em"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="group-hover:-translate-y-1 transition duration-150 group-active:rotate-45"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <title>triangle-filled</title>{" "}
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        {" "}
        <g id="drop" fill="#000000" transform="translate(32.000000, 42.666667)">
          {" "}
          <path
            d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z"
            id="Combined-Shape"
          >
            {" "}
          </path>{" "}
        </g>{" "}
      </g>{" "}
    </g>
  </svg>
);
