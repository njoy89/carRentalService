import { useState, useEffect } from 'react';
import { Client } from '../types';
import ClientService from "../services/clientService";

export interface GetClientData {
    client: Client | null;
    isFetching: boolean;
    error: string;
}

export function getClient(): GetClientData {
    const [data, setData] = useState<GetClientData>({
        client: null,
        isFetching: false,
        error: ''
    });

    const loadClient = () => {
        const clientId = ClientService.getId();

        if (clientId === null) {
            return;
        }

        setData({
            client: null,
            isFetching: true,
            error: ''
        });

        ClientService
            .getClient(clientId)
            .then((response) => {
                if (typeof response === 'string') {
                    setData({
                        client: null,
                        isFetching: false,
                        error: response
                    });
                } else {
                    setData({
                        client: response,
                        isFetching: false,
                        error: ''
                    });
                }
            });
    };

    useEffect(() => {
        loadClient();
    }, []);

    return data;

}