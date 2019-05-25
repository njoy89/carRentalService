import { Car } from '../types';
import ClientService from '../services/clientService';

const loadCars = (): Promise<Car[]> => new Promise((resolve) => {
    // simulation of some slight delay
    setTimeout(() => {
        resolve(
            // TODO
            fetch('http://192.168.0.178:8080/api/allCars')
                .then(response => response.json())
        );
    }, 500);
});

const rentCar = (carId: string, startDate: Date, endDate: Date): Promise<string> => {
    const clientId = ClientService.getId();

    // TODO
    return fetch('http://192.168.0.178:8080/api/rentCar', {
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

export default {
    loadCars,
    rentCar
}
