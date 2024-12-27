import { useEffect, useState } from 'react';
import { apiClient } from '../../services/api/apiClient';  

const useSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/subscriptions'); 
                setSubscriptions(response.data.subscriptions); 
            } catch (err) {
                console.error('Eroare la preluarea subscripțiilor:', err);
                setError('Nu am putut prelua subscripțiile.');
            } finally {
                setLoading(false);
            }
        };
        

        fetchSubscriptions();
    }, []); 
    return { subscriptions, loading, error };
};

export default useSubscriptions;
