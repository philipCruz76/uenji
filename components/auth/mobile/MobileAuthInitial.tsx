import { useEmailCredentialsStore } from "@/lib/stores/modal-store";
import { useLogInVariantStore } from "@/lib/stores/auth-store";
import { socialAction } from "@/lib/actions/auth/socialAction";
import { signInText, signUpText } from "@/constants/auth/signInConstants";

const MobileAuthInitial = () => {
  let { isLogin } = useLogInVariantStore();
  const { setShowEmailCredentials } = useEmailCredentialsStore();

  return (
    <section className="flex flex-col space-y-3 ">
      {/* Auth buttons */}
      <div className="flex flex-col py-[40%] space-y-2 items-center justify-center font-semibold text-[16px] ">
        <div className="flex flex-row space-x-2  w-screen h-[40px] px-6 ">
          <button
            className="flex flex-row border w-screen h-[40px] items-center justify-between rounded-sm"
            onClick={() => setShowEmailCredentials(true)}
          >
            <div className="pl-1 ">
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <rect x="8" y="12" width="48" height="40"></rect>
                  <polyline points="56 20 32 36 8 20"></polyline>
                </g>
              </svg>
            </div>

            <p className="w-full">
              {isLogin === "login"
                ? signInText.credentialsText
                : signUpText.credentialsText}
            </p>
          </button>
        </div>

        {/* Google Button */}
        <div className="flex flex-row space-x-2  w-screen h-[40px] px-6 ">
          <button
            className="flex border w-screen h-[40px] items-center justify-center rounded-sm"
            onClick={() => socialAction("google")}
          >
            <svg
              width="28px"
              height="28px"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pl-1"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
                  fill="#4285F4"
                ></path>{" "}
                <path
                  d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z"
                  fill="#34A853"
                ></path>{" "}
                <path
                  d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z"
                  fill="#FBBC05"
                ></path>{" "}
                <path
                  d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z"
                  fill="#EB4335"
                ></path>{" "}
              </g>
            </svg>
            <p className="w-full">Continue with Google</p>
          </button>
        </div>

        <div className="flex max-w-full py-2 items-center justify-center text-center font-extralight text-slate-400">
          <p>OR</p>
        </div>

        <div className="flex flex-row  space-x-2  w-screen h-[40px] items-center justify-between px-6 ">
          <button
            className="flex flex-row w-full space-x-2 border  h-[40px] items-center justify-center text-center rounded-sm"
            onClick={() => socialAction("facebook")}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 207 207"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
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
            <p>Facebook</p>
          </button>

          <button className="flex flex-row w-full space-x-2 border h-[40px] items-center justify-center text-center rounded-sm">
            <svg
              fill="#000000"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"></path>{" "}
              </g>
            </svg>
            <p>Apple</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MobileAuthInitial;
