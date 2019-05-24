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
