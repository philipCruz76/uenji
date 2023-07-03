import { NavLinks } from "@/constants"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet"
import { buttonVariants } from "./ui/Button"
import { cn } from "@/lib/utils"
import SignUpButton from "./ui/SignUpButton"

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger  className="flex lg:hidden ml-auto justify-between items-center focus:outline-none " >
                <button className="flex items-center px-3 py-2 text-gray-600 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </SheetTrigger>
            
            <SheetContent side={"left"} className="flex flex-col py-10 w-[270px] "  >
                <SignUpButton />
                <ul className="flex flex-col text-slate-600 text-base font-medium gap-4">
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key} className="hover:text-slate-800">
                            {link.text}
                        </Link>
                    ))}
                </ul>

            </SheetContent>
        </Sheet>
    )
}

export default MobileNav