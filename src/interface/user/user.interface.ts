import { User } from "../navbar/user.interface";

export interface UserContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
}