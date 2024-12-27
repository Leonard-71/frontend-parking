import { apiClient } from "../api/apiClient";

 
export const registerService = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const response = await apiClient.post("/auth/register", formData);

  if (response.status === 201) {
    return response.data;
  } else {
    throw new Error("Registrarea a eșuat.");
  }
};
