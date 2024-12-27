import { useContext } from "react";
import { RegisterContext } from "../../context/register/registerContext";

export const useRegister = () => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error('useRegister must be used within a RegisterProvider');
    }
    return context;
};
