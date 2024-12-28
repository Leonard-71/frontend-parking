import { useContext } from "react"; 
import { SubscriptionHistoryContext } from "../../context/subscription-history/SubscriptionHistoryContext";

export const useSubscriptionHistory = () => {
    const context = useContext(SubscriptionHistoryContext);
    if (!context) {
        throw new Error("useSubscriptionHistoryContext must be used within a SubscriptionHistoryProvider");
    }
    return context;
};
 