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

            <button className="bg-sky-500 w-full h-[50px] text-white px-4 py-2 rounded-md border-none max-w-[440px]">
                Your Button Here
            </button>
        </div>
    );
};

export default HeroMobileOverlay;
