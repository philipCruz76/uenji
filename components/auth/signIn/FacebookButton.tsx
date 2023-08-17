import { socialAction } from "@/lib/actions/auth/socialAction";

const FacebookButton = () => {
  return (
    <>
      {/* Facebook Button */}
      <button
        className="flex flex-row space-x-2 border w-[170px] h-[50px] items-center justify-center text-center "
        onClick={() => socialAction("facebook")}
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 207 207"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          className="mr-6"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
              fill="#3c5a9a"
            ></path>
          </g>
        </svg>
        <p className="pr-10">Facebook</p>
      </button>
    </>
  );
};

export default FacebookButton;
