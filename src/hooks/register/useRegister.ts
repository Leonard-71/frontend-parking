import { useState } from "react";
import { toast } from "react-toastify";
import {apiClient} from "../api/apiClient"; 
import { REGISTER_TEXTS } from "../../translations/register/register";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/auth/register", formData);

      if (response.status === 201) {
        toast.success(REGISTER_TEXTS.successMessage);
        return true;
      } else {
        throw new Error("Registrarea a eșuat.");
      }
    } catch (err: any) {
      console.error("Eroare la înregistrare:", err);
      setError("Eroare la crearea contului.");
      toast.error(REGISTER_TEXTS.errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};

export default useRegister;
