export enum CarStatus {
    AVAILABLE = 'AVAILABLE',
    RENTED = 'RENTED',
    UNAVAILABLE = 'UNAVAILABLE'
}

export interface Car {
    id: string;
    model: string;
    carBodyType: string;
    releaseYear: number;
    carStatus: CarStatus;
    amount: number;
    url: string;
}

export interface CarsData {
    cars: Car[];
    isFetching: boolean;
    error: string;
}

export interface Client {
    id: string;
    name: string;
    surname: string;
    email: string;
    address: string;
}

// TODO
export interface MyRental {
    id: string;
    carId: string;
    startDate: string;
    endDate: string;
    rentDate: string;
    returnDate: string | null;
    amount: number;
    comment: string;
}

export interface MyRentalsData {
    data: MyRental[];
    isFetching: boolean;
    error: string;
}
