import { useState, useEffect } from 'react';
import CarService from '../services/carService';
import { Car, GetCarsData } from '../types';

export function getCars(): GetCarsData {
    const [data, setData] = useState<GetCarsData>({
        cars: [],
        isFetching: false,
        error: ''
    });

    useEffect(() => {
        setData({
            cars: [],
            isFetching: true,
            error: ''
        });

        CarService.loadCars()
            .then((cars: Car[]) => {
                setData({
                    cars,
                    isFetching: false,
                    error: ''
                });
            })
            .catch(() => {
                setData({
                    cars: [],
                    isFetching: false,
                    error: 'Error while fetching error'
                });
            });
    }, []);

    return data;
}
