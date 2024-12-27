import { useState } from "react";
import { apiClient} from "../../services/api/apiClient";  

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/auth/login", { email, password });

      if (response.status === 201 && response.data.access_token) { 
        return { token: response.data.access_token };
      }

      throw new Error("Autentificarea a eșuat.");
    } catch (err: any) {
      setError("Autentificarea a eșuat. Verifică datele și încearcă din nou.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
