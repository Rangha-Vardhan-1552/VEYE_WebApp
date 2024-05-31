import React from 'react'
import Navbar from '../components/navbar'
import { IoPersonCircle } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa6";

export default function Signup() {
  return (
    <>
        <Navbar/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className=' bg-slate-50 border shadow-md sm:mx-auto sm:w-full sm:max-w-sm px-3 my-3 rounded-md'>  
        <div className="sm:mx-auto sm:w-full sm:max-w-sm py-3 ">
          {/* <img
            className="mx-auto h-10 w-auto m-2 "
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <IoPersonCircle  className="mx-auto h-14 w-14  text-blue-700"/>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div className='flex gap-2'>
              <div className=' flex flex-col'>
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                  FirstName
                </label>
                <div className="mt-2">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    autoComplete="firstname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                  LastName
                </label>
                <div className="mt-2">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    autoComplete="lastname"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="mobileNo" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile No
              </label>
              <div className="mt-2">
                <input
                  id="mobileNo"
                  name="mobileNo"
                  type="mobileNo"
                  autoComplete="mobileNo"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="re_password" className="block text-sm font-medium leading-6 text-gray-900">
                Re-Password
              </label>
              <div className="mt-2">
                <input
                  id="re_password"
                  name="re_password"
                  type="password"
                  autoComplete="re_password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="uppercase caret-rose-600 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 mb-3">
            Already a member?{' '}
            <a href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signin
            </a>
          </p>
        </div>
        </div>
      </div>
    </>
  )
}