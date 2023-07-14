'use client'

import { NavLinks } from "@/constants"
import Link from "next/link"
import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import MobileNav from "./MobileNav";

const activeNavBar = " fixed top-0 z-10 flex  max-w-full w-full mx-auto px-4 py-4 bg-white shadow-md transition duration-500 ease-in-out"
const inactiveNavBar = " fixed top-0 z-10 flex max-w-full w-full mx-auto px-4 py-4 bg-transparent text-white transition duration-500 ease-in-out"


const NavBar = () => {

    let [navbar, setNavbar] = useState(false);
    let [mobileNav, setMobileNav] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 60) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);
        }
    }, []);


    return (
        <nav className={navbar ? activeNavBar : inactiveNavBar}>

            {/*NavBar items*/}
            <div className="flex w-full items-center justify-between xl:gap-8 ">

                {/* Hambuger Menu and Logo Container */}
                <div className="flex tablet:px-2  tablet:w-auto w-full justify-between items-center">

                    {/*Mobile Nav Button*/}
                    <div className="lg:hidden flex focus:outline-none">
                        <button className="flex items-center py-2 text-gray-600 " onClick={() => setMobileNav(true)} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                        {mobileNav && <MobileNav sidebarOpen={mobileNav} setOpenState={setMobileNav} />}
                    </div>

                    {/*Logo*/}
                    <Link href="/" className="flex font-sans font-bold text-[34px] ">
                        Uenji
                    </Link>
                </div>

                <div className="tablet:flex hidden items-end justify-end w-full">
                    {/*Search Bar*/}
                    {navbar &&
                        <div className=" tablet:flex hidden w-full  px-2">
                            <input type="text" placeholder="Encontre o serviço que precisa aqui" className="border-2 border-slate-300 bg-white h-10 px-5 w-full rounded-l-md text-sm text-black focus:outline-none focus:border-slate-500" />
                            <button type="submit" className=" w-12 border-black bg-black rounded-r-md overflow-visible ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 28" strokeWidth="2" stroke="white" className="w-[28px] h-[22px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                    }
                </div>


                {/*Nav Links and Auth Button Container*/}
                <div className="flex w-full tablet:min-w-max items-center text-center justify-end tablet:gap-8">

                    {/*Nav Links*/}
                    <ul className="desktop:flex hidden  text-base font-semibold px-2 gap-[20px]">
                        {NavLinks.map((link) => (
                            <Link href={link.href} key={link.key}>
                                {link.text}
                            </Link>
                        ))}
                    </ul>

                    {/*Auth Button*/}
                    <div className="flex tablet:flex-row tablet:gap-3">
                        <div className="text-center items-center hidden tablet:flex font-semibold text-base focus:border-none focus:outline-none">
                            <AuthModal signIn={true} />
                        </div>

                        <div className="flex mx-auto sm:w-[80px] w-[60px] font-semibold text-base focus:outline-none">
                            <AuthModal signIn={false} />
                        </div>

                    </div>
                </div>
            </div>

        </nav>
    )
}

export default NavBar