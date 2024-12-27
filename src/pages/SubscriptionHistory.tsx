import { useEffect } from 'react';
import { getGlobalUserId } from '../hooks/userIdStore';
import { useSubscriptionHistoryContext } from '../hooks/subscription-history/useSubscriptionHistory';

const SubscriptionHistory = () => {
    const userId = getGlobalUserId();
    const { subscriptionsHistory, fetchSubscriptionHistory } = useSubscriptionHistoryContext();
    useEffect(() => {
        if (userId) {
            fetchSubscriptionHistory(userId);
        }
    }, [userId, fetchSubscriptionHistory]);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'lipsă';
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

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
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Preț</th>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Data început</th>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Data sfârșit</th>
                            <th className="border-b-2 border-gray-300 px-6 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptionsHistory.length > 0 ? (
                            subscriptionsHistory.map((subscription) => (
                                <tr key={subscription.id} className="hover:bg-gray-200 transition duration-200">
                                    <td className="border-b border-gray-300 px-6 py-4 ">
                                        Abonament {subscription.subscription?.name || 'N/A'}
                                    </td>
                                    <td className="border-b border-gray-300 px-6 py-4 font-semibold text-blue-600">
                                        {subscription.subscription?.price !== undefined &&
                                            subscription.subscription?.price !== null
                                            ? parseFloat(subscription.subscription.price.toString()).toFixed(2)
                                            : 'lipsa'}{' '}
                                        RON
                                    </td>
                                    <td className="border-b border-gray-300 px-6 py-4">
                                        {formatDate(subscription.startDate)}
                                    </td>
                                    <td className="border-b border-gray-300 px-6 py-4">
                                        {formatDate(subscription.endDate)}
                                    </td>
                                    <td className="border-b border-gray-300 px-6 py-4 ">
                                        {subscription.isActive ? (
                                            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Activ</span>
                                        ) : (
                                            <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full">Inactiv</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="border-b border-gray-300 px-6 py-4 text-center text-gray-500">
                                    Nu există date momentan.
                                </td>
                            </tr>
                        )}
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default SubscriptionHistory;
