enum CarStatus {
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
}

const loadCars = () => Promise.resolve<Car[]>(
    // TODO
    [
        {"id":"9a1ed0b4-0d38-4846-baf8-b36fe72308d9","model":"Mercedes-Benz","carBodyType":"Hatchback","releaseYear":2011,"carStatus":CarStatus.AVAILABLE,"amount":25.0},
        {"id":"711146df-f8cd-4ec3-af31-1399eabbf363","model":"Land Rover","carBodyType":"Crossover","releaseYear":2010,"carStatus":CarStatus.AVAILABLE,"amount":24.0},
        {"id":"17376e31-a697-43b4-bcdc-5911b9fd0255","model":"Suzuki","carBodyType":"Minivan","releaseYear":2019,"carStatus":CarStatus.AVAILABLE,"amount":50.0},
        {"id":"f11ce76a-9325-48a9-80e2-aebb64302f5f","model":"Audi ","carBodyType":"Crossover","releaseYear":2016,"carStatus":CarStatus.RENTED,"amount":32.0},
        {"id":"4229ae47-4efc-40a5-8318-cf8383cca04d","model":"Volvo","carBodyType":"Sedan","releaseYear":2001,"carStatus":CarStatus.AVAILABLE,"amount":20.0}
    ]
);

export default {
    loadCars
}
