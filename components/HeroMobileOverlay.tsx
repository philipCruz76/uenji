const HeroMobileOverlay = () => {
    return (
        <div className="bg-zinc-900 w-full h-[420px] flex flex-col items-center justify-center">

            {/*Slogan*/}
            <div className="py-6 max-w-[440px] w-full" >
                < div className="flex desktop:gap-4 tablet:gap-2 gap-[4px]" >
                    <div className="tablet:text-4xl text-3xl font-bold text-white ">Find the right</div>
                    <div className="tablet:text-4xl  text-3xl font-serif italic text-white">freelance</div>
                </div >
                <div className='flex  gap-2 w-full'  >
                    <div className="tablet:text-4xl  text-3xl font-serif italic text-white"> service, </div>
                    <div className="tablet:text-4xl text-3xl font-bold text-white">right away</div>
                </div>
            </div>



            <form className="flex w-full max-w-[440px] mb-4 h-[50px]">
                <input
                    type="text"
                    placeholder="Search for any service..."
                    className="flex-1 p-2 rounded-md border-none"
                />
            </form>

            <button className="bg-sky-500 w-full h-[50px] items-center justify-between text-center text-white px-4 py-2 rounded-md border-none max-w-[440px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-5 h-5 items-center justify-between text-center">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </div>
    );
};

export default HeroMobileOverlay;
