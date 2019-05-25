import { Car } from '../types';

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

export default {
    loadCars
}
