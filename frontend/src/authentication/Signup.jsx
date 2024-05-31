import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { IoPersonCircle } from "react-icons/io5";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(null);

  const inputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: 'Signup successful!' });
        console.log(data.message);
        // Redirect or handle successful signup
      } else {
        setMessage({ type: 'error', text: data.message });
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className='bg-slate-50 border shadow-md sm:mx-auto sm:w-full sm:max-w-sm px-3 my-3 rounded-md'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm py-3">
            <IoPersonCircle className="mx-auto h-14 w-14 text-blue-700" />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    onChange={inputHandler}
                    value={formData.username}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                    onChange={inputHandler}
                    value={formData.email}
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
                    onChange={inputHandler}
                    value={formData.password}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {message && (
              <div className={`mt-4 text-center text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.text}
              </div>
            )}

            <p className="mt-10 text-center text-sm text-gray-500 mb-3">
              Already a member?{' '}
              <a href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
