
import { MobileNavLinks } from "@/constants"
import Link from "next/link"
import AuthModal from "./AuthModal"
import { FC, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"


interface MobileNavProps {
    sidebarOpen: boolean
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNav: FC<MobileNavProps> = ({ sidebarOpen, setOpenState }) => {

    // TODO - Fix transitions
    return (
        <Transition appear show={sidebarOpen} as={Fragment}>

            <Dialog as="div" onClose={() => setOpenState(false)} className="lg:hidden flex  fixed inset-0 z-40 overflow-y-auto" >


                <Transition.Child
                    as={Fragment}
                    enter=" ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave=" ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="lg:hidden fixed  inset-0 bg-black bg-opacity-50 " onClick={() => setOpenState(false)} />
                </Transition.Child>


                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-500 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in duration-500 transform"
                    leaveFrom="-translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Dialog.Panel className="lg:hidden flex flex-col left-0  h-full  min-h-screen  w-72 px-4 py-6 bg-white border-r border-gray-200" >


                        {/* Mobile Menu Content */}
                        <div className="overflow-y-auto flex-1">

                            {/*Join Button*/}
                            <AuthModal signIn={false} />

                            {/*Nav Links*/}
                            <ul className="flex flex-col text-gray-400 text-base font-light py-8 gap-[20px]">
                                {MobileNavLinks.map((link) => (
                                    <Link href={link.href} key={link.key}>
                                        {link.text}
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>

            </Dialog>
        </Transition>

    )
}

export default MobileNav