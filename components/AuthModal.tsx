
import { useState, FC } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/Button"
import { useMediaQuery } from "react-responsive"
import DesktopAuthModal from "./DesktopAuthModal"
import MobileAuthModal from "./MobileAuthModal"
import SmallScreenJoinSheet from "./SmallScreenJoinSheet"
import SmallScreenSignInSheet from "./SmallScreenSignInSheet"


interface AuthModalProps {
  signIn: boolean;
}


const AuthModal: FC<AuthModalProps> = ({ signIn }) => {

  let [isOpen, setIsOpen] = useState(false)
  let isDekstopOrLaptop = useMediaQuery({ minWidth: 900 })
  let isTablet = useMediaQuery({ minWidth: 600, maxWidth: 899 })
  let isMobile = useMediaQuery({ maxWidth: 599 })


  function openModal() {
    setIsOpen(true)
  }


  return (
    <>
      {!signIn ?
        <Link href="/" onClick={openModal} className={cn(buttonVariants({ variant: "default" }))} > Join </Link> : <Link href="/" onClick={openModal} > Sign in </Link>}


      {/* Desktop Auth Modal */}
      {isDekstopOrLaptop && <DesktopAuthModal opened={isOpen} signedIn={signIn} setOpenState={setIsOpen} />}

      {/* Mobile Auth Modal */}
      {isTablet && <MobileAuthModal opened={isOpen} signedIn={signIn} setOpenState={setIsOpen} />}

      {isMobile && signIn && <SmallScreenSignInSheet opened={isOpen} setOpenState={setIsOpen} />}

      {isMobile && !signIn && <SmallScreenJoinSheet opened={isOpen} setOpenState={setIsOpen} />}

    </>

  )
}

export default AuthModal