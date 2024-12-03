import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SubscriptionCard from '../components/subscriptions/SubscriptionCard';
import useSubscriptions from '../hooks/subscriptions/useSubscriptions';

const Subscription = () => {
    const { subscriptions, loading, error } = useSubscriptions();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 to-gray-900">
            <Navbar />
            <div className='py-20'>
                <h1 className="text-4xl font-bold text-center text-gray-100 mb-8"> Lista abonamente </h1>
            </div>
            <div className="flex-grow flex flex-col items-center">
                {loading && <p className="text-gray-100">Se încarcă...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subscriptions.map((subscription, index) => (
                        <SubscriptionCard key={index} subscription={subscription} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Subscription; 