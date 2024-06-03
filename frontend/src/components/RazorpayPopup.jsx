import React, { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/userContext';
import SuccessPopup from './SuccessPopup';

export default function RazorpayPopup({ onClose, price, duration }) {
  const [orderDetails, setOrderDetails] = useState({});
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const showPopup = () => setPopupVisible(true);
  const hidePopup = () => {
    setPopupVisible(false);
    onClose(paymentSuccessful);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const username = user.username;

    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/payment/orders/createorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price, // amount in smallest currency unit (e.g., 50000 paise = INR 500)
          currency: 'INR',
          receipt: username,
        }),
      });

      const data = await response.json();
      setOrderDetails(data);
      setLoading(false);

      var options = {
        key: 'rzp_test_6M7yCVVuyARkKD', // Replace with your Razorpay key ID
        amount: Number(parseInt(data.amount, 10)),
        currency: data.currency,
        name: 'Purview',
        description: 'Test Transaction',
        image: 'https://media.glassdoor.com/sqll/970882/purview-consultancy-services-squareLogo-1702624544207.png',
        order_id: data.id, // Use data.id directly
        handler: async function (response) {
          await verifyPayment(response);
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
      setLoading(false);
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
        setPaymentSuccessful(true);
        setPopupVisible(true);
      } else {
        console.error('Payment verification failed', verifyData);
      }
    } catch (error) {
      console.error('Error verifying payment', error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-4 px-10 rounded mx-auto font-sans sm:mx-auto sm:w-full sm:max-w-md">
          <div className='flex gap-2 mb-2'>
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <h2 className='flex-col text-red-600 font-semibold text-lg '>Confirmation Required</h2>
          </div>
          <div>
            <div className='flex gap-2'>
              <label className='flex-col font-semibold'>Username</label>
              <span className='flex-col '>{user.username}</span>
            </div>
            <div className='flex gap-2'>
              <label className='flex-col font-semibold'>Email</label>
              <span className='flex-col '>{user.email}</span>
            </div>
            <div className='flex gap-2'>
              <label className='flex-col font-semibold'>Subscription</label>
              <span className='flex-col '>{`$${price}/${duration}`}</span>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 text-sm">
            <button className="px-2 py-2 bg-gray-300 rounded" onClick={() => onClose(false)}>Cancel</button>
            <button className="px-2 py-2 bg-red-600 text-white rounded" onClick={handlePayment}>{loading ? 'Loading...' : 'Payment'}</button>
          </div>
        </div>
      </div>
      {isPopupVisible && <SuccessPopup onSuccessClose={hidePopup} />}
    </>
  );
}
