import { useState, useEffect } from 'react';
import CarService, { Car } from '../services/carService';

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
