const HeroMobileOverlay = () => {
  return (
    <div className="flex h-[620px] w-full flex-col items-center justify-center bg-[#f8f9fa] px-4">
      {/*Slogan*/}
      <div className="w-full max-w-[440px] py-6">
        <div className="flex gap-[4px] tablet:gap-2 desktop:gap-4">
          <span className=" text-3xl font-bold text-black ">
            {""}Encontre o especialista de{" "}
            <div className="h-[38px] overflow-hidden  font-serif text-[32px] font-medium  leading-[38px]">
              <span className="relative animate-rotating-text-mobile text-black">
                <i>
                  Programação
                  <br />
                  Fotografia
                  <br />
                  Negócios
                  <br />
                  Marketing
                  <br />
                </i>
              </span>
            </div>
            adequado para si
          </span>
        </div>
      </div>

      {/*Search Bar*/}
      <form className="mb-4 flex h-[50px] w-full max-w-[440px] ">
        <input
          type="text"
          placeholder="Pesquise qualquer serviço..."
          className="flex-1 rounded-md border border-black bg-white p-2 text-[16px] focus:outline-none "
        />
      </form>

      <button className="h-[50px] w-full max-w-[440px] rounded-md border-none bg-black px-4 py-2 text-[#E2DEDB]">
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="flex h-5 w-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default HeroMobileOverlay;
