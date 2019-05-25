import { useState, useEffect } from 'react';
import CarService from '../services/carService';
import ClientService from '../services/clientService';
import { MyRental, MyRentalsData } from '../types';

export interface GetMyRentalsData extends MyRentalsData {
    loadData: () => void;
}

export function getMyRentals(): GetMyRentalsData {
    const [data, setData] = useState<MyRentalsData>({
        data: [],
        isFetching: false,
        error: ''
    });

    const loadData = () => {
        const clientId = ClientService.getId();

        if (clientId === null) {
            return;
        }

        setData({
            data: [],
            isFetching: true,
            error: ''
        });

        CarService.getMyRentals(clientId)
            .then((response: MyRental[] | string) => {
                if (typeof response === 'string') {
                    setData({
                        data: [],
                        isFetching: false,
                        error: 'Error while fetching error'
                    });
                } else {
                    setData({
                        data: response,
                        isFetching: false,
                        error: ''
                    });
                }
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    return {
        ...data,
        loadData
    };
}
