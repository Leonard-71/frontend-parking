import SubscriptionCard from '../components/subscriptions/PubscriptionCard';
import useSubscriptions from '../hooks/subscriptions/useSubscriptions';

const Subscription = () => {
    const { subscriptions, loading, error } = useSubscriptions();

    return (
        <div className="flex-grow flex flex-col justify-center items-center text-center p-6 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className='py-20'>
                <h1 className="text-4xl font-bold text-center text-gray-100 mb-8"> Lista abonamente </h1>
            </div>
            <div className="flex-grow flex flex-col items-center">
                {loading && <p className="text-gray-100">Se încarcă...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
                        subscriptions.map((subscription, index) => (
                            <SubscriptionCard key={index} subscription={subscription} isPopupOpen={false} onPopupOpen={function (): void {
                                throw new Error('Function not implemented.');
                            }} />
                        ))
                    ) : (
                        !loading && <p className="text-gray-100">Nu există abonamente disponibile.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Subscription;
