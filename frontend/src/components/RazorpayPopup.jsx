import React, { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userContext';

export default function RazorpayPopup({ onClose }) {
  const [orderDetails, setOrderDetails] = useState({});
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    const username = user.username;
    onClose(true)
    try {
      const response = await fetch('http://localhost:4000/payment/orders/createorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 500, // amount in smallest currency unit (e.g., 50000 paise = INR 500)
          currency: 'INR',
          receipt: username,
        }),
      });

      const data = await response.json();
      setOrderDetails(data);
      console.log(data.message.id);

      var options = {
        key: 'rzp_test_6M7yCVVuyARkKD', // Replace with your Razorpay key ID
        amount:Number(parseInt(data.amount,10)),
        currency: data.currency,
        name: 'Purview',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: data.message.id, // Use data.id directly
        handler: function (response) {
          console.log(response);
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          alert(`Signature: ${response.razorpay_signature}`);
          // Call the backend to verify the payment
          verifyPayment(response);
        },
        prefill: {
          name: user.username,
          email: user.email,
          contact: '9381903983',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      console.log("options", options);
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(`Error: ${response.error.code}`);
        alert(`Description: ${response.error.description}`);
        alert(`Source: ${response.error.source}`);
        alert(`Step: ${response.error.step}`);
        alert(`Reason: ${response.error.reason}`);
        alert(`Order ID: ${response.error.metadata.order_id}`);
        alert(`Payment ID: ${response.error.metadata.payment_id}`);
      });
      rzp1.open();

    } catch (error) {
      console.error('Payment failed...!', error);
    }
  };

  const verifyPayment = async (response) => {
    try {
      const verifyResponse = await fetch('http://localhost:4000/payment/orders/verifyorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });

      const verifyData = await verifyResponse.json();
      if (verifyResponse.ok) {
        console.log('Payment verified successfully', verifyData);
        alert("verification done and Payment successful...!")
        // Handle successful verification (e.g., update UI, redirect, etc.)
      } else {
        console.error('Payment verification failed', verifyData);
      }
    } catch (error) {
      console.error('Error verifying payment', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded">
        <div className='flex gap-2'>
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <h2 className='flex-col'>Confirmation Required</h2>
        </div>
        <div>
          <div className='flex gap-2'>
            <label className='flex-col'>Username</label>
            <span className='flex-col font-semibold'>{user.username}</span>
          </div>
          <div className='flex gap-2'>
            <label className='flex-col'>Email</label>
            <span className='flex-col font-semibold'>{user.email}</span>
          </div>
          <div className='flex gap-2'>
            <label className='flex-col'>Subscription</label>
            <span className='flex-col font-semibold'>$259/6months</span>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-8 text-sm">
          <button className="px-2 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-2 py-2 bg-red-600 text-white rounded" onClick={handlePayment}>Payment</button>
        </div>
      </div>
    </div>
  );
}
