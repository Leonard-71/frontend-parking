import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext trebuie utilizat în interiorul unui UserProvider.');
    }
    return context;
};
