import { useEffect, useState } from 'react';
const SubscriptionHistory = () => {
    const [subscriptions] = useState([
        { id: 1, name: 'Abonament Premium', type: 'Lunar', price: 29.99, startDate: '2023-01-01', endDate: '2024-01-01', isActive: true },
        { id: 2, name: 'Abonament Standard', type: 'Anual', price: 199.99, startDate: '2022-01-01', endDate: '2023-01-01', isActive: false },
    ]);

    useEffect(() => {

    }, []);

    return (
        <div className="w-full flex flex-col bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex-grow p-8">
                <h1 className="text-2xl font-bold mb-8 text-white text-center">Istoricul abonamentelor</h1>
                <table
                    className="bg-white border border-gray-300 rounded-lg shadow-lg mx-auto"
                    style={{ width: '80%' }}
                >
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Nume abonament</th>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Tip</th>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Preț</th>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Data inceput</th>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Data sfârșit</th>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((subscription) => (
                            <tr key={subscription.id} className="hover:bg-gray-200 transition duration-200">
                                <td className="border-b border-gray-300 px-6 py-4">{subscription.name}</td>
                                <td className="border-b border-gray-300 px-6 py-4">{subscription.type}</td>
                                <td className="border-b border-gray-300 px-6 py-4 font-semibold text-blue-600">{subscription.price.toFixed(2)} RON</td>
                                <td className="border-b border-gray-300 px-6 py-4">{subscription.startDate}</td>
                                <td className="border-b border-gray-300 px-6 py-4">{subscription.endDate}</td>
                                <td className="border-b border-gray-300 px-6 py-4">
                                    {subscription.isActive ?
                                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Activ</span> :
                                        <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full">Inactiv</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubscriptionHistory; 