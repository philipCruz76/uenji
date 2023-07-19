import Image from "next/image";

const HeroDesktopOverlay = () => {
  return (
    <>
      {/*Background Image*/}
      <Image
        alt="backgroung image"
        src="/bg-image.jpeg"
        className="flex object-fill w-full"
        width={500}
        height={700}
        loading="lazy"
      />

      {/*Overlay*/}
      <div className="container flex absolute z-1 inset-0 mt-56 px-6 flex-col items-start justify-start ">
        {/*Slogan*/}
        <div className="flex lg:w-[640px]  h-[100px] tablet:w-[440px] desktop:gap-4 tablet:gap-2 gap-[4px]">
          <span className="lg:text-5xl tablet:text-4xl text-3xl font-bold text-white ">
            {""}Find the right{" "}
            <i className="font-serif font-medium">freelance service,</i> right
            away
          </span>
        </div>

        {/*Search Bar*/}
        <div className="flex lg:w-[600px] tablet:w-[500px] lg:py-6 py-2">
          <input
            type="text"
            placeholder="Pesquise pelo serviço "
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
      </div>
    </>
  );
};

export default HeroDesktopOverlay;
