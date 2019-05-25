import { Client } from '../types';
import { HOST } from '../constants';

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
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                fetch(`${HOST}/api/getClient?clientId=${encodeURIComponent(clientId)}`)
                    .then(response => response.json())
            );
        }, 500);
    });
};

export default {
    getId,
    isAuthenticated,
    setId,
    logout,
    getClient
};
