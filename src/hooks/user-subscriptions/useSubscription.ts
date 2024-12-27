import { AxiosError } from 'axios';
import { useState } from 'react';
import { apiClient } from '../../services/api/apiClient';
import { getGlobalUserId } from '../userIdStore';

export const useSubscription = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
 
  const checkActiveSubscription = async (subscriptionTypeId: string): Promise<boolean> => {
    const userId = getGlobalUserId();
    try {
      const response = await apiClient.post('/user-subscriptions/check-active', {
        userId,
        subscriptionTypeId,
      });
      return response.data;  
    } catch (error) {
      console.error('Error checking active subscription:', error);
      return false; 
    }
  };

  const confirmSubscription = async (subscriptionTypeId: string) => {
    const userId = getGlobalUserId(); 

    setLoading(true);
    try {
      const response = await apiClient.post('/user-subscriptions', {
        userId,
        subscriptionTypeId,
      });
      setLoading(false);
      setModalOpen(false);
      return response.data;
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        if (error.response?.status === 400 && error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
      }

      throw new Error('An error occurred while confirming the subscription.');
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    confirmSubscription,
    checkActiveSubscription,  
    isLoading,
  };
};
