'use client'

import { useState, FC, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/Button"
import DesktopAuthModal from "./DesktopAuthModal"
import MobileAuthModal from "./MobileAuthModal"
import SmallScreenAuthSheet from "./SmallScreenAuthSheet"


interface AuthModalProps {
  signIn: boolean;
}

const AuthModal: FC<AuthModalProps> = ({ signIn }) => {

  let [isOpen, setIsOpen] = useState(false)
  let [isMobile, setIsMobile] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  const checkScreenSize = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  return (
    <>
      {!signIn ? <Link href="/" onClick={openModal} className={cn(buttonVariants({ variant: "default" }), "flex max-auto sm:w-[80px] w-[60px] font-semibold text-base focus:outline-none")} > Join </Link> :
        <Link href="/" onClick={openModal} className={cn("text-center items-center  hidden sm:flex font-semibold text-base focus:border-none focus:outline-none")} > Sign in </Link>}

      {!isMobile ? <DesktopAuthModal opened={isOpen} signedIn={signIn} setOpenState={setIsOpen} /> :
        <SmallScreenAuthSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        {/*<MobileAuthModal opened={isOpen} signedIn={signIn} setOpenState={setIsOpen}/> :*/}

    </>

  )
}

export default AuthModal