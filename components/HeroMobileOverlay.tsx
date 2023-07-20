const HeroMobileOverlay = () => {
  return (
    <div className="bg-zinc-900 w-full h-[420px] px-4 flex flex-col items-center justify-center">
      {/*Slogan*/}
      <div className="py-6 max-w-[440px] w-full">
        <div className="flex desktop:gap-4 tablet:gap-2 gap-[4px]">
        <span className=" text-3xl font-bold text-white ">
            {""}Encontre o {" "}
            <i className="font-serif font-medium">serviço de freelance</i> {" "} certo para si
          </span>
        </div>
        
      </div>

      {/*Search Bar*/}
      <form className="flex w-full max-w-[440px] mb-4 h-[50px]">
        <input
          type="text"
          placeholder="Pesquise qualquer serviço..."
          className="flex-1 p-2 rounded-md border-none"
        />
      </form>

      <button className="bg-sky-500 w-full h-[50px] text-white px-4 py-2 rounded-md border-none max-w-[440px]">
        <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="flex w-5 h-5 "
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
