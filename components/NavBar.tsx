'use client'

import { NavLinks } from "@/constants"
import Link from "next/link"
import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import MobileNav from "./MobileNav";

const activeNavBar = "antialiased container fixed top-0 z-10 flex w-full justify-between items-center px-6 py-4 bg-white shadow-md transition duration-500 ease-in-out"
const inactiveNavBar = "antialiased container fixed top-0 z-10 flex w-full justify-between items-center px-6 py-4 bg-transparent text-white transition duration-500 ease-in-out"


const NavBar = () => {

    let [navbar, setNavbar] = useState(false);


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

            {/*Mobile Nav Button*/}
            <div className="flex lg:hidden ml-auto justify-between items-center focus:outline-none">
                <MobileNav />
            </div>

            {/*Logo*/}
            <div className="flex-1 flex items-center  justify-center sm:justify-start gap-8 ">
                <div className="flex font-sans font-bold text-[34px] lg:mr-6  sm:px-0 px-32">
                    <Link href="/">Uenji</Link>
                </div>


                {/*Search Bar*/}
                <div className="sm:flex lg:max-w-md hidden flex-1 px-2">
                    <input type="text" placeholder="Encontre o serviço que precisa aqui" className="border-2 border-slate-300 bg-white h-10 px-5 w-full rounded-l-md text-sm text-black focus:outline-none focus:border-slate-500" />
                    <button type="submit" className="relative w-12 border-black bg-black rounded-r-md overflow-visible ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 28" strokeWidth="2" stroke="currentColor" className="w-[28px] h-[22px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>


                {/*Nav Links*/}
                <ul className=" lg:flex hidden text-base font-semibold px-2 gap-[20px]">
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key}>
                            {link.text}
                        </Link>
                    ))}
                </ul>

                {/*Auth Button*/}
                <div className="flex flex-row gap-3 ">
                    <AuthModal signIn={true} />
                    <AuthModal signIn={false} />
                </div>

            </div>


            <div className="flex justify-center items-center gap-4">

            </div>
        </nav>
    )
}

export default NavBar