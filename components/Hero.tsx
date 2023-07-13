import React from 'react'

const Hero = () => {
    return (
        <div>

            {/*Background Image*/}
            <img className="flex object-fill w-full" src="./bg-image.jpeg" alt="backgroung image" />

            {/*Overlay*/}
            <div className="container flex absolute z-1 inset-0 mt-64 px-6 flex-col items-start justify-start ">

                {/*Slogan*/}
                <div className="flex flex-row  md:gap-4 sm:gap-2 gap-[4px]">
                    <div className="md:text-5xl text-3xl font-bold text-white ">Find the right</div>
                    <div className="md:text-5xl  text-3xl font-serif italic text-white">freelance</div>
                </div>
                <div className='flex relative gap-2' >
                    <div className="md:text-5xl  text-3xl font-serif italic text-white"> service, </div>
                    <div className="md:text-5xl text-3xl font-bold text-white">right away</div>
                </div>
                

                {/*Search Bar*/}
                <div className="flex py-6">
                    <input type="text" placeholder="Pesquise pelo serviço " className="border-2 border-slate-300 bg-white h-14 px-5 md:w-[600px] rounded-l-md text-sm text-black focus:outline-none focus:border-slate-500" />
                    <button type="submit" className=" border-black bg-black rounded-r-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>


            </div>
        </div>
    )
}

export default Hero