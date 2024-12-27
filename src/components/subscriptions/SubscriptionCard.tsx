import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSubscription } from '../../hooks/user-subscriptions/useSubscription';
import { SUBSCRIPTION_CARD_TEXTS } from '../../translations/subscription/card-subscriptions';
import { SubscriptionCardProps } from '../../interface/subscription-card/subscription-card.interface';

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const { confirmSubscription, checkActiveSubscription, isLoading } = useSubscription();

    const handleSubscriptionClick = () => setPopupOpen(true);

    const confirmSubscriptionHandler = async () => {
        try {
            const isActive = await checkActiveSubscription(subscription.id);

            if (isActive) {
                toast.error(SUBSCRIPTION_CARD_TEXTS.duplicateSubscriptionError);
                return;
            }

            await confirmSubscription(subscription.id);
            toast.success(
                `${SUBSCRIPTION_CARD_TEXTS.successMessage} ${subscription.name}!`
            );
        } catch (error: any) {
            toast.error(
                error.message === 'User already has an active subscription of this type.'
                    ? SUBSCRIPTION_CARD_TEXTS.duplicateSubscriptionError
                    : SUBSCRIPTION_CARD_TEXTS.errorMessage
            );
            console.error('Error confirming subscription:', error.message);
        } finally {
            setPopupOpen(false);
        }
    };

    const cancelSubscription = () => setPopupOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setPopupOpen(false);
            }
        };

        if (isPopupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopupOpen]);

    return (
        <div className="relative mr-10 w-full max-w-sm shadow-lg flex flex-col p-6 my-4 rounded-lg hover:scale-105 duration-100 bg-test2 transition-transform">
            <h2 className="text-3xl font-bold text-center py-4 text-black">
                {subscription.name || SUBSCRIPTION_CARD_TEXTS.missing}
            </h2>
            <p className="text-center text-5xl font-bold text-black">
                {subscription.price || '0'} {SUBSCRIPTION_CARD_TEXTS.money}
            </p>
            <div className="text-center font-medium">
                <p className="py-2 black-white mx-8 mt-6 text-lg">
                    {SUBSCRIPTION_CARD_TEXTS.entries} {subscription.entries || 0}
                </p>
                <p className="py-2 text-black mx-8 text-lg">
                    {SUBSCRIPTION_CARD_TEXTS.type}{' '}
                    {subscription.accessType === 'outside'
                        ? SUBSCRIPTION_CARD_TEXTS.outside
                        : SUBSCRIPTION_CARD_TEXTS.inside}
                </p>
            </div>

            <button
                className="bg-test3 hover:bg-sky-950 text-white duration-150 w-full rounded-md font-medium my-6 px-6 py-3 transition-transform transform hover:scale-105"
                onClick={handleSubscriptionClick}
            >
                {SUBSCRIPTION_CARD_TEXTS.selectSubscription}
            </button>

            {isPopupOpen && (
                <div
                    ref={popupRef}
                    className="absolute inset-0 bg-sky-950 rounded-lg shadow-lg p-6 z-10 flex flex-col justify-center items-center"
                >
                    <h1 className="text-xl font-extrabold text-white text-center">
                        {SUBSCRIPTION_CARD_TEXTS.confirmTitle}
                    </h1>
                    <p className="text-gray-300 mt-6 text-center leading-relaxed">
                        {SUBSCRIPTION_CARD_TEXTS.confirmMessage}
                    </p>
                    <div className="mt-10 flex justify-center space-x-16">
                        <button
                            className="px-6 py-3 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-200 ease-in-out rounded-lg shadow-md font-medium text-sm"
                            onClick={cancelSubscription}
                        >
                            {SUBSCRIPTION_CARD_TEXTS.cancel}
                        </button>
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transition-all duration-200 ease-in-out rounded-lg shadow-md font-medium text-sm"
                            onClick={confirmSubscriptionHandler}
                            disabled={isLoading}
                        >
                            {SUBSCRIPTION_CARD_TEXTS.confirm}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionCard;
