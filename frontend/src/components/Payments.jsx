import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/userContext';

function Payments() {
    const [details, setDetails] = useState([]);
    const {user} =useAuth()
    useEffect(() => {
        async function fetchPayments() {
            try {
                const response = await fetch('http://localhost:4000/payment/orders/fetchPayments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({username:user.username})
                });
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPayments();
    }, []);

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Payment ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {details && details.map((item) => (
                            <tr
                                key={item._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item.paymentID}
                                </th>
                                <td className="px-6 py-4">{item.orderID}</td>
                                <td className="px-6 py-4">{item.amount}</td>
                                <td className="px-6 py-4">{item.status}</td>
                                <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Payments;
