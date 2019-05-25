import * as React from 'react';
import { useState } from 'react';

import { getCars } from '../../hooks/getCars';
import { getMyRentals } from '../../hooks/getMyRentals';
import { Car } from '../../types';
import CarService from '../../services/carService';

import { RentalCarModal } from './RentalCarModal';
import { ReturnCarModal } from './ReturnCarModal';
import { CarCard } from './CarCard';

import { Notification } from '../Notification';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        spinnerWrapper: { display: 'flex', justifyContent: 'center' }
    })
);

export const Cars: React.FunctionComponent<{}> = () => {
    const [modalCar, setModalCar] = useState<Car | null>(null);
    const [rentalModalIsShown, setRentalModalIsShown] = useState(false);
    const [returnModalIsShow, setReturnModalIsShow] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getCarsData = getCars();
    const getMyRentalsData = getMyRentals();
    const classes = useStyles();
    const updateData = () => {
        getCarsData.loadData();
        getMyRentalsData.loadData();
    };

    const handleRentCarClick = (car: Car) => {
        setModalCar(car);
        setRentalModalIsShown(true);
    };
    const handleReturnCarClick = (car: Car) => {
        setModalCar(car);
        setReturnModalIsShow(true);
    };
    const handleRentalModalClose = () => {
        setModalCar(null);
        setRentalModalIsShown(false);
    };
    const handleReturnModalClose = () => {
        setModalCar(null);
        setReturnModalIsShow(false);
    };
    const handleRental = (startDate: Date, endDate: Date) => {
        if (modalCar === null) {
            return;
        }

        const carId = modalCar.id;

        CarService.rentCar(carId, startDate, endDate)
            .then((response) => {
                if (response !== 'OK') {
                    setErrorMessage('You cannot rent this car');
                } else {
                    setSuccessMessage('You rented a car!');
                    updateData();
                }

                handleRentalModalClose();
            });
    };
    const handleReturn = (comments: string) => {
        if (modalCar === null) {
            return;
        }

        const myRental = CarService.getMyRentalByCarId(getMyRentalsData.data, modalCar.id);

        if (!myRental) {
            return;
        }

        CarService.returnCar(myRental.id, comments)
            .then((response) => {
                if (typeof response === 'string') {
                    setErrorMessage('You cannot return this car');
                } else {
                    setSuccessMessage('You returned a car!');
                    updateData();
                }

                handleReturnModalClose();
            });
    };

    if (getCarsData.isFetching || getMyRentalsData.isFetching) {
        return (
            <div className={classes.spinnerWrapper}>
                <CircularProgress size={60} />
            </div>
        );
    }

    return (
        <>
            <Grid container spacing={3}>{
                getCarsData.cars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        handleRentCarClick={handleRentCarClick}
                        handleReturnCarClick={handleReturnCarClick}
                        isRentedByCurrentUser={CarService.isCarRentedByCurrentUser(getMyRentalsData.data, car.id)}
                    />
                ))
            }</Grid>
            { modalCar && (
                <RentalCarModal
                    show={rentalModalIsShown}
                    handleClose={handleRentalModalClose}
                    handleOk={handleRental}
                    car={modalCar}
                />
            ) }
            { modalCar && (
                <ReturnCarModal
                    show={returnModalIsShow}
                    handleClose={handleReturnModalClose}
                    handleOk={handleReturn}
                    car={modalCar}
                />
            ) }
            <Notification
                open={!!successMessage}
                message={successMessage}
                handleClose={() => setSuccessMessage('')}
                variant="success"
            />
            <Notification
                open={!!errorMessage}
                message={errorMessage}
                handleClose={() => setErrorMessage('')}
                variant="error"
            />
        </>
    );
};
