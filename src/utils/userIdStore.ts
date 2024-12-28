let userId: string | null = localStorage.getItem('userId');  

export const setGlobalUserId = (id: string) => {
    userId = id;
    localStorage.setItem('userId', id);  
};

export const getGlobalUserId = () => {
    if (!userId) {
        userId = localStorage.getItem('userId'); 
    }
    return userId;
};
