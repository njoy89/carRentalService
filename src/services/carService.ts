import { Car, MyRental } from '../types';
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

// TODO
const getMyRentals = (): Promise<MyRental[]> => new Promise((resolve) => {
    setTimeout(() => {
        resolve(
            // TODO
            [
                { id: 'bubu', carId: 'fb0df273-681f-4362-86b2-fab18a248c01', startDate: '', endDate: '', rentDate: '', returnDate: null, amount: 100.0, comment: '' }
            ]
        )
    }, 500);
});

const returnCar = (carRentalId: string, comment: string): Promise<string> => {
    const clientId = ClientService.getId();

    return fetch(`${HOST}/api/returnCar`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientId,
            carRentalId,
            comment
        })
    })
        .then(response => response.json());
};

const isCarRentedByCurrentUser = (myRentals: MyRental[], carId: string): boolean =>
    myRentals
        .filter(item => item.returnDate === null) // not yet returned
        .filter(item => item.carId === carId)
        .length > 0;

// get a rental object related to a given carId and that has not beed returned yet
const getMyRentalByCarId = (myRentals: MyRental[], carId: string): MyRental | undefined =>
    myRentals
        .filter(item => item.returnDate === null) // not yet returned
        .find(item => item.carId === carId);

export default {
    loadCars,
    rentCar,
    returnCar,
    getMyRentals,
    isCarRentedByCurrentUser,
    getMyRentalByCarId
}
