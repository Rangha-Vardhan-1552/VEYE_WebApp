import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userContext';

export default function Popup({ onClose }) {
  const {logout }=useAuth()
  const navigate= useNavigate()
  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/signout',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data= await response.json()
      if(response.ok){
        // alert(data.message)        
        logout()
        onClose();
        navigate('/signup')
      }
    } catch (error) {
      console.error("Signout failed",error)
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded">
        <div className='flex gap-2'>
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
        <h2 className='flex-col'>Are you sure you want to sign out?</h2>

        </div>
        
        <div className="flex justify-end gap-4 mt-8 text-sm">
          <button className="px-2 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-2 py-2 bg-red-600 text-white rounded" onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}
