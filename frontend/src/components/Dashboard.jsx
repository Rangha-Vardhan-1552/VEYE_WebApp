import { CheckIcon } from '@heroicons/react/20/solid';
import Navbar from './navbar';
import RazorpayPopup from './RazorpayPopup';
import { useState } from 'react';

const includedFeatures = [
  'Private forum access',
  'Member resources',
  'Entry to annual conference',
  'Official member t-shirt',
];

const subscriptionOptions = [
  { title: '6 Months Subscription', price: 259, duration: '6 months' },
  { title: '3 Months Subscription', price: 129, duration: '3 months' },
  { title: 'Monthly Subscription', price: 99, duration: '1 month' },
];

export default function Dashboard() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const showPopup = (price,duration) => {
    setSelectedPrice(price);
    setSelectedDuration(duration)
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
    setSelectedPrice(null);
    setSelectedDuration(null)
  };

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Together we are changing the world</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Revolutionize your view with smart specs that blend cutting-edge AI technology with wearable elegance.
            </p>
          </div>
          {subscriptionOptions.map((option, index) => (
            <div key={index} className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none shadow-xl border-black">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">{option.title}</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Unlock exclusive features with a smart specs membership.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-sm lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-8 shadow-lg  border-blue-600">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">Pay & Enjoy Subscription</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">${option.price}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                    <a
                      onClick={() => showPopup(option.price,option.duration)}
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                    >
                      Get access
                    </a>
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      Invoices and receipts available for easy company reimbursement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isPopupVisible && <RazorpayPopup onClose={hidePopup} price={selectedPrice} duration={selectedDuration} />}
    </>
  );
}
