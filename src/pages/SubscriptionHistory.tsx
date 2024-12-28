import { useEffect } from "react";
import { getGlobalUserId } from "../hooks/userIdStore";
import { useSubscriptionHistory } from "../hooks/subscription-history/useSubscriptionHistory";
import { SUBSCRIPTION_HISTORY_TEXTS } from "../translations/subscription-history/subscriptionHistoryTexts";
import { formatDate } from "../utils/formatDate";

const SubscriptionHistory: React.FC = () => {
    const userId = getGlobalUserId();
    const { subscriptionsHistory, loading, error, fetchHistory } = useSubscriptionHistory();

    useEffect(() => {
        if (userId) {
            fetchHistory(userId);
        }
    }, [userId, fetchHistory]);



    return (
        <div className="w-full flex flex-col bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex-grow p-8">
                <h1 className="text-2xl font-bold mb-8 text-white text-center">
                    {SUBSCRIPTION_HISTORY_TEXTS.title}
                </h1>
                {loading ? (
                    <p className="text-center text-white">{SUBSCRIPTION_HISTORY_TEXTS.loading}</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div
                        className="bg-white border border-gray-300 rounded-lg shadow-lg mx-auto"
                        style={{
                            width: "80%",
                            maxHeight: "680px",
                            overflowY: "scroll",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        <table className="w-full">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="border-b-2 border-gray-300 px-6 py-3 text-left">
                                        {SUBSCRIPTION_HISTORY_TEXTS.subscriptionName}
                                    </th>
                                    <th className="border-b-2 border-gray-300 px-6 py-3 text-left">
                                        {SUBSCRIPTION_HISTORY_TEXTS.price}
                                    </th>
                                    <th className="border-b-2 border-gray-300 px-6 py-3 text-left">
                                        {SUBSCRIPTION_HISTORY_TEXTS.startDate}
                                    </th>
                                    <th className="border-b-2 border-gray-300 px-6 py-3 text-left">
                                        {SUBSCRIPTION_HISTORY_TEXTS.endDate}
                                    </th>
                                    <th className="border-b-2 border-gray-300 px-6 py-3 text-left">
                                        {SUBSCRIPTION_HISTORY_TEXTS.status}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptionsHistory.length > 0 ? (
                                    subscriptionsHistory.map((subscription) => (
                                        <tr key={subscription.id} className="hover:bg-gray-200 transition duration-200">
                                            <td className="border-b border-gray-300 px-6 py-4">
                                                {subscription.subscription?.name || "N/A"}
                                            </td>
                                            <td className="border-b border-gray-300 px-6 py-4 font-semibold text-blue-600">
                                                {subscription.subscription?.price
                                                    ? `${parseFloat(subscription.pricePaid.toString()).toFixed(2)} RON`
                                                    : "lipsă"}
                                            </td>
                                            <td className="border-b border-gray-300 px-6 py-4">
                                                {formatDate(subscription.startDate)}
                                            </td>
                                            <td className="border-b border-gray-300 px-6 py-4">
                                                {formatDate(subscription.endDate)}
                                            </td>
                                            <td className="border-b border-gray-300 px-6 py-4">
                                                {subscription.isActive ? (
                                                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
                                                        {SUBSCRIPTION_HISTORY_TEXTS.active}
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full">
                                                        {SUBSCRIPTION_HISTORY_TEXTS.inactive}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="border-b border-gray-300 px-6 py-4 text-center text-gray-500"
                                        >
                                            {SUBSCRIPTION_HISTORY_TEXTS.noData}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>

    );
};

export default SubscriptionHistory;
