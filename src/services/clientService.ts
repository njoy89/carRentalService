import { Client } from '../types';

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

const getClient = (clientId: string): Promise<Client | string> => {
    // TODO
    return fetch(`http://192.168.0.178:8080/api/getClient?clientId=${encodeURIComponent(clientId)}`)
        .then(response => response.json());
};

export default {
    getId,
    isAuthenticated,
    setId,
    logout,
    getClient
};
