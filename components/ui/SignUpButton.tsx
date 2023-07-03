'use client'

import { Dialog, Transition } from "@headlessui/react"
import Image from "next/image"
import { Fragment, useState } from "react"
import photo from "@/public/business.jpg"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./Button"

const SignUpButton = () => {

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }


  return (
    <>
      <Link href="/" onClick={openModal} className={cn(buttonVariants({variant:"default"}),"w-[80px] font-semibold text-base")} > Join </Link>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-row w-full max-w-lg transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" >
                    <Image alt="design logo" src={photo} width={4000} height={5000} />
                  </Dialog.Title>
                  <div className="p-6">

                    {/* Close Button */}
                    <div className="absolute top-4 right-4">
                      <button className="h-6 p-0 w-6 rounded-md" onClick={() => closeModal} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className=" mx-auto  flex-col justify-center space-y-6 sm:w-[400px]">
                      <div className="flex flex-col space-y-2">
                        <div className="text-3xl font-bold">Sign in</div>
                        <div className="text-sm text-gray-500">Sign in to your account</div>
                      </div>
                    </div>


                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>

  )
}

export default SignUpButton