import Image from "next/image";

const HeroDesktopOverlay = () => {
  return (
    <>
      <div className="bg-amber-800 w-full"></div>
      {/*Background Image*/}
      <Image
        alt="backgroung image"
        src="/bg-transparent.png"
        className="flex bg-amber-800 items-end justify-end object-right h-[700px]"
        width={500}
        height={700}
      />

      {/*Overlay*/}
      <div className="container flex absolute z-1 inset-0 mt-56 px-6 flex-col items-start justify-start ">
        {/*Slogan*/}
        <div className="flex lg:w-[640px]  h-[100px] tablet:w-[440px] desktop:gap-4 tablet:gap-2 gap-[4px]">
          <span className="lg:text-5xl tablet:text-4xl text-3xl font-bold text-white ">
            {""}Encontre o{" "}
            <i className="font-serif font-medium">serviço de freelance</i> certo
            para si
          </span>
        </div>

        {/*Search Bar*/}
        <div className="flex lg:w-[600px] tablet:w-[500px] lg:py-6 py-2">
          <input
            type="text"
            placeholder="Pesquise qualquer serviço..."
            className="border-2 border-slate-300 bg-white h-12 px-5 desktop:w-[600px] rounded-l-md text-sm text-black focus:outline-none focus:border-slate-500"
          />
          <button
            type="submit"
            className="flex  border-black bg-black rounded-r-md w-[50px] items-center justify-between text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-16 0 50 24"
              strokeWidth="1.5"
              stroke="white"
              className="flex items-center justify-between w-10 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        {/*Featured Services*/}
        <div className="flex flex-row gap-2 items-center justify-center py-2">
          <span className="text-white font-medium text-base  text-start items-center justify-center">
            Popular :
          </span>
          <ul className="flex flex-row gap-2 text-white text-sm ">
            <li>
              <a className="flex border font-medium w-[100px] items-center justify-center rounded-full cursor-pointer hover:bg-white hover:text-black">
                Fotografia
              </a>
            </li>

            <li>
              <a className="flex border font-medium w-[100px] items-center justify-center rounded-full cursor-pointer hover:bg-white hover:text-black">
                Design
              </a>
            </li>

            <li>
              <a className="flex border font-medium w-[120px] items-center justify-center rounded-full cursor-pointer hover:bg-white hover:text-black">
                Programação
              </a>
            </li>

            <li>
              <a className="flex border font-medium w-[120px] items-center justify-center rounded-full cursor-pointer hover:bg-white hover:text-black">
                Escrita
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeroDesktopOverlay;
