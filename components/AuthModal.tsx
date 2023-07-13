'use client'

import { useState, FC } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/Button"
import DesktopAuthModal from "./DesktopAuthModal"
import MobileAuthModal from "./MobileAuthModal"
import SmallScreenAuthSheet from "./SmallScreenAuthSheet"
import { useMediaQuery } from "react-responsive"



interface AuthModalProps {
  signIn: boolean;
}


const AuthModal: FC<AuthModalProps> = ({ signIn }) => {

  let [isOpen, setIsOpen] = useState(false)
  let  isDekstopOrLaptop = useMediaQuery({minWidth: 900})
  let isTablet = useMediaQuery({minWidth: 600, maxWidth: 899})
  let isMobile = useMediaQuery({maxWidth: 599})
  function openModal() {
    setIsOpen(true)
  }


  return (
    <>
      {!signIn ? <Link href="/" onClick={openModal} className={cn(buttonVariants({ variant: "default" }), "flex max-auto sm:w-[80px] w-[60px] font-semibold text-base focus:outline-none")} > Join </Link> :
        <Link href="/" onClick={openModal} className={cn("text-center items-center  hidden sm:flex font-semibold text-base focus:border-none focus:outline-none")} > Sign in </Link>}
        

      {/* Desktop Auth Modal */}
      {isDekstopOrLaptop && <DesktopAuthModal opened={isOpen} signedIn={signIn} setOpenState={setIsOpen} />}

      {/* Mobile Auth Modal */}
      {isTablet && <MobileAuthModal opened={isOpen} signedIn={signIn} setOpenState={setIsOpen} />}

      {isMobile && <SmallScreenAuthSheet opened={isOpen} signedIn={signIn} setOpenState={setIsOpen} />}

    </>

  )
}

export default AuthModal