import { Car } from '../types';
import ClientService from '../services/clientService';
import { HOST } from '../constants';

const loadCars = (): Promise<Car[]> => new Promise((resolve) => {
    // simulation of some slight delay
    setTimeout(() => {
        resolve(
            fetch(`${HOST}/api/allCars`)
                .then(response => response.json())
        );
    }, 500);
});

const rentCar = (carId: string, startDate: Date, endDate: Date): Promise<string> => {
    const clientId = ClientService.getId();

    return fetch(`${HOST}/api/rentCar`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientId,
            carId,
            startDate,
            endDate,
        })
    })
        .then(response => response.json());
};

const returnCar = (carId: string, comment: string): Promise<string> => {
    // TODO
    return Promise.resolve('OK');
};

export default {
    loadCars,
    rentCar,
    returnCar
}
