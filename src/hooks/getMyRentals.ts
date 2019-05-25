import { useState, useEffect } from 'react';
import CarService from '../services/carService';
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
        setData({
            data: [],
            isFetching: true,
            error: ''
        });

        CarService.getMyRentals()
            .then((myRentals: MyRental[]) => {
                setData({
                    data: myRentals,
                    isFetching: false,
                    error: ''
                });
            })
            .catch(() => {
                setData({
                    data: [],
                    isFetching: false,
                    error: 'Error while fetching error'
                });
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
