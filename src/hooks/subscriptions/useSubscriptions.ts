import { useEffect, useState } from 'react';

const useSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                setLoading(true);
                const mockSubscriptions = [
                    {
                        name: 'Plan Premium',
                        price: '100',
                        entries: 10,
                        exits: 5,
                        accessType: 'Exterior',
                    },
                    {
                        name: 'Plan Standard',
                        price: '50',
                        entries: 5,
                        exits: 2,
                        accessType: 'Exterior',
                    },
                    {
                        name: 'Plan Basic',
                        price: '20',
                        entries: 2,
                        exits: 1,
                        accessType: 'Interior',
                    },
                ];

                setSubscriptions(mockSubscriptions);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    return { subscriptions, loading, error };
};

export default useSubscriptions;

