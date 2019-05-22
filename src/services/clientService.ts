const CLIENT_ID_KEY = 'clientId';

const getId = (): string | null => window.localStorage.getItem(CLIENT_ID_KEY);

const isAuthenticated = (): boolean => {
    const id = getId();
    return !(id === null || id === '');
};

const setId = (clientId: string) => {
    window.localStorage.setItem(CLIENT_ID_KEY, clientId);
};

const logout = () => {
    window.localStorage.removeItem(CLIENT_ID_KEY);
};

export default {
    getId,
    isAuthenticated,
    setId,
    logout
};
