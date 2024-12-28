export interface SessionContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
}