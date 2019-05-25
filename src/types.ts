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

export enum RentalStatus {
    RENTED = 'RENTED',
    RETURNED_BUT_CHARGE_NOT_SETTLED = 'RETURNED_BUT_CHARGE_NOT_SETTLED',
    RETURNED_AND_CHARGE_SETTLED = 'RETURNED_AND_CHARGE_SETTLED'
}

export interface MyRental {
    id: string;
    carId: string;
    startDate: string;
    endDate: string;
    rentDate: string;
    returnDate: string | null;
    amount: number;
    subcharge: number;
    comments: string;
    status: RentalStatus;
}

export interface MyRentalsData {
    data: MyRental[];
    isFetching: boolean;
    error: string;
}
