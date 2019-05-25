import { useState, useEffect } from 'react';
import CarService from '../services/carService';
import { Car, CarsData } from '../types';

export interface GetCarsData extends CarsData {
    loadCars: () => void;
}

export function getCars(): GetCarsData {
    const [data, setData] = useState<CarsData>({
        cars: [],
        isFetching: false,
        error: ''
    });

    const loadCars = () => {
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
    };

    useEffect(() => {
        loadCars();
    }, []);

    return {
        ...data,
        loadCars
    };
}
