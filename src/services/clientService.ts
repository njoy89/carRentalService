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

const validateSession = (): Promise<void> => {
    const clientId = getId();

    if (clientId === null) {
        return Promise.resolve();
    } else {
        return getClient(clientId)
            .then((response) => typeof response !== 'string')
            .catch(() => false)
            .then((validated: boolean) => {
                if (!validated) {
                    logout();
                }
            });
    }
};

const getClient = (clientId: string): Promise<Client | string> =>
    fetch(`${HOST}/api/getClient?clientId=${encodeURIComponent(clientId)}`)
        .then(response => response.json());

export default {
    getId,
    isAuthenticated,
    setId,
    logout,
    getClient,
    validateSession
};
