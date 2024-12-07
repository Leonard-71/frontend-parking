let userId: string | null = null;

export const setGlobalUserId = (id: string) => {
    userId = id;
};

export const getGlobalUserId = () => {
    return userId;
};
