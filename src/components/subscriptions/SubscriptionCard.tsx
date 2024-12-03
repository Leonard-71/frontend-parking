import React from 'react';
import { SUBSCRIPTION_CARD_TEXTS } from '../../constants/subscription/card-subscriptions.constants';

interface SubscriptionCardProps {
    subscription: {
        name: string;
        price: string;
        entries: number;
        accessType: string;
    };
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
    return (
        <div className="mr-10 w-full max-w-sm shadow-lg flex flex-col p-6 my-4 rounded-lg hover:scale-105 duration-100   bg-test2  transition-transform">
            <h2 className="text-3xl font-bold text-center py-4 text-black">{subscription.name}</h2>
            <p className="text-center text-5xl font-bold text-black">{subscription.price} Lei/lună</p>
            <div className="text-center font-medium">
                <p className="py-2 black-white mx-8 mt-6 text-lg">
                    {SUBSCRIPTION_CARD_TEXTS.entries} {subscription.entries}
                </p>
                <p className="py-2 text-black mx-8 text-lg">
                    {SUBSCRIPTION_CARD_TEXTS.type} {subscription.accessType}
                </p>
            </div>

            <button className="bg-test3 hover:bg-sky-950 text-white duration-150 w-full rounded-md font-medium my-6 px-6 py-3 transition-transform transform hover:scale-105">
                Alege planul
            </button>

        </div>
    );
};

export default SubscriptionCard;


/*


 <div className="mr-10 w-full max-w-sm shadow-lg flex flex-col p-6 my-4 rounded-lg hover:scale-105 duration-100   bg-sky-950  transition-transform">
            <h2 className="text-3xl font-bold text-center py-4 text-white">{subscription.name}</h2>
            <p className="text-center text-5xl font-bold text-white">{subscription.price} Lei/lună</p>
            <div className="text-center font-medium">
                <p className="py-2 text-white mx-8 mt-6 text-lg">
                    {SUBSCRIPTION_CARD_TEXTS.entries} {subscription.entries}
                </p>
                <p className="py-2 text-white mx-8 text-lg">
                    {SUBSCRIPTION_CARD_TEXTS.type} {subscription.accessType}
                </p>
            </div>

            <button className="bg-gray-800 hover:bg-sky-950 text-white duration-150 w-full rounded-md font-medium my-6 px-6 py-3 transition-transform transform hover:scale-105">
                Alege planul
            </button>

        </div>

        */