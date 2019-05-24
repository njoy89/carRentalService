import { useState, useEffect } from 'react';
import CarService from '../services/carService';
import { Car } from '../types';

export function getCars(): Car[] {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        CarService.loadCars()
            .then((cars: Car[]) => {
                setCars(cars);
            });
    }, []);

    return cars;
}
