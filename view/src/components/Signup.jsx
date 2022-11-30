import React from 'react'
import './Signup.css'

const Signup = () => {
  return (
<div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-1 text-3xl text-center"><b>Sign up</b></h1>
                    <h2 class="AccountType">Choose your account type:</h2>
                    <div class="Button">
                    <button class="HostButton">Host</button>
                    <button class="PeerButton">Peer</button>
                    </div>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name" />

                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />

                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                    >Sign Up</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark pr-1 pl-1" href="#">
                            Terms of Service
                        </a> and 
                        <a class="no-underline border-b border-grey-dark text-grey-dark pl-1" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue text-blue pl-1" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
  )
}

export default Signup