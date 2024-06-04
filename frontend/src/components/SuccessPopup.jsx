import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function SuccessPopup({ onSuccessClose }) {
  const navigate= useNavigate()
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="flex-row  bg-white p-4 rounded justify-center sm:mx-auto sm:w-full sm:max-w-xs">
           <div className='flex justify-center mb-3'>
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-300 sm:mx-0 sm:h-10 sm:w-10">
                    <CheckBadgeIcon className="h-6 w-6 rounded-full text-white bg-blue-700 justify-center" aria-hidden="true" />
                </div>
           </div>
           <div className='flex justify-center'>
                <span className='text-lg font-semibold font-sans text-center'>🎉Payment Successful...✨</span>
           </div>  
        
        <div className="flex justify-center gap-4 mt-8 text-sm">
          <button className="px-4 py-2 bg-gray-300 rounded uppercase font-semibold" onClick={onSuccessClose} >Ok</button>
          {/* <button className="px-2 py-2 bg-blue-400 text-white rounded font-semibold" onClick={()=>navigate('/dashboard')}>dashboard</button> */}
        </div>
      </div>
    </div>
  );
}
