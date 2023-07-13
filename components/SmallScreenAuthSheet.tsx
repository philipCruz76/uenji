'use client'


import { Dialog, Transition } from "@headlessui/react"
import { FC, Fragment, useState } from 'react';

interface SmallScreenAuthSheetProps {
  opened: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>
  signedIn: boolean;
}

const signInText = {
  title: 'Sign into your account',
  subtext: 'Dont have an account?',
  hyperlinkText: 'Join here',
  credentialsText: 'Continue with email/username'
}

const signUpText = {
  title: 'Create a new account',
  subtext: 'Already have an account?',
  hyperlinkText: 'Sign in',
  credentialsText: 'Continue with email'
}

const SmallScreenAuthSheet: FC<SmallScreenAuthSheetProps> = ({ opened, signedIn, setOpenState }) => {

  let [signInView, setSignInView] = useState(signedIn)
  const handleSignIn = () => {
    setSignInView((current) => !current)
  }

  return (

    <Transition appear show={opened} as={Fragment}>
      <section className='container flex fixed top-0 left-0 right-0 bottom-0 z-20 border text-black border-white bg-white rounded-md'>

        <div className='flex relative items-start mx-auto px-4 py-4  font-bold text-3xl'>
          <h2> Join Uenji</h2>
        </div>

        {/* Close Button*/}
        <div className="absolute top-6 right-6">
          <button className="h-6 p-0 w-6 rounded-md" onClick={(curr) => setOpenState(!curr)} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>



      </section>
    </Transition>
  );
}

export default SmallScreenAuthSheet;