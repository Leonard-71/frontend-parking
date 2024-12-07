import useSubscriptionHistory from '../hooks/subscription-history/useSubscriptionHistory';
import { getGlobalUserId } from '../hooks/userIdStore';

const SubscriptionHistory = () => {
    const userId = getGlobalUserId();

    if (!userId) {
        return <p className="text-red-500 text-center">Eroare: Nu s-a putut obține ID-ul utilizatorului.</p>;
    }

    const { subscriptionsHistory, loading, error } = useSubscriptionHistory(userId);

    if (loading) {
        return <p className="text-white text-center">Se încarcă abonamentele...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    const formatDate = (dateString: string) => {
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
                        {subscriptionsHistory.map((subscription) => (
                            <tr key={subscription.id} className="hover:bg-gray-200 transition duration-200">
                                <td className="border-b border-gray-300 px-6 py-4 ">Abonament {subscription.name}</td>
                                <td className="border-b border-gray-300 px-6 py-4 font-semibold text-blue-600">
                                    {parseFloat(subscription.price.toString()).toFixed(2)} RON
                                </td>
                                <td className="border-b border-gray-300 px-6 py-4">{formatDate(subscription.startDate)}</td>
                                <td className="border-b border-gray-300 px-6 py-4">{subscription.endDate ? formatDate(subscription.endDate) : '-'}</td>
                                <td className="border-b border-gray-300 px-6 py-4 ">
                                    {subscription.isActive ? (
                                        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">Activ</span>
                                    ) : (
                                        <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full">Inactiv</span>
                                    )}
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
