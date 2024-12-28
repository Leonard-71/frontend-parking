import { useSubscriptionHistoryContext } from "../../context/subscription-history/SubscriptionHistoryContext";

export const useSubscriptionHistory = () => {
    return useSubscriptionHistoryContext();
};
