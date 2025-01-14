import { useContext } from "react";
import { SubscriptionContext } from "../../context/subscription/SubscriptionContext";

export const useSubscriptionContext = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error("useSubscriptionContext must be used within a SubscriptionProvider");
    }
    return context;
};