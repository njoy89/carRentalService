import * as React from 'react';
import { useState } from 'react';
import { getCars } from '../../hooks/getCars';
import { Car, CarStatus } from '../../types';
import { RentalCarModal } from './RentalCarModal';
import CarService from '../../services/carService';
import { Notification } from '../Notification';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary
        },
        media: {
            height: 250,
            backgroundSize: 'contain',
            transform: 'scale(1.25)'
        },
        model: {
            textAlign: 'center'
        },
        dividerUpper: {
            margin: '30px 0'
        },
        dividerBelow: {
            marginTop: 30
        },
        actionButton: {
            marginLeft: 8
        },
        statusCopyAvailable: { color: green[500], fontWeight: 700 },
        statusCopyUnavailable: { color: red[500], fontWeight: 700 },
        statusCopyRented: { color: orange[500], fontWeight: 700 },
        spinnerWrapper: { display: 'flex', justifyContent: 'center' }
    })
);

interface CarCardProps {
    car: Car;
    rentCar: (car: Car) => void;
    returnCar: (car: Car) => void;
}

const CarCard: React.FunctionComponent<CarCardProps> = ({
    car,
    rentCar,
    returnCar
}) => {
    const classes = useStyles();

    const renderTrait = (
        name: string,
        value: Car['carBodyType'] | Car['releaseYear'] | Car['amount']
    ) => (
        <Grid item xs={4}>
            <Typography variant="h6" component="h6" color="textPrimary">{ name }</Typography>
            <Typography component="p" color="textSecondary">{ value }</Typography>
        </Grid>
    );

    const getStatusClassname = (): string => {
        switch (car.carStatus) {
            case CarStatus.AVAILABLE:
                return classes.statusCopyAvailable;
            case CarStatus.UNAVAILABLE:
                return classes.statusCopyUnavailable;
            case CarStatus.RENTED:
                return classes.statusCopyRented;
            default:
                return '';
        }
    };

    const renderStatus = () => {
        const className = getStatusClassname();
        return (
            <Grid item xs={4}>
                <Typography variant="h6" component="h6" color="textPrimary">Status</Typography>
                <Typography component="p" className={className}>{ car.carStatus }</Typography>
            </Grid>
        );
    };

    const getActionButton = () => {
        // TODO: determine which button is supposed to be shown

        return (
            <Button
                size="small"
                color="primary"
                variant="outlined"
                className={classes.actionButton}
                disabled={[CarStatus.UNAVAILABLE, CarStatus.RENTED].includes(car.carStatus)}
                onClick={() => rentCar(car)}
            >Rent</Button>
        );
    };

    return (
        <Grid item md={12} lg={6}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={car.url}
                    title={car.model}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h4" className={classes.model} color="textPrimary">
                        { car.model }
                    </Typography>

                    <Divider className={classes.dividerUpper} />

                    <Grid container spacing={3}>
                        { renderTrait('Release Year', car.releaseYear) }
                        { renderTrait('Car Body Type', car.carBodyType) }
                        { renderTrait('Amount', `${car.amount} PLN / day`) }
                        { renderStatus() }
                    </Grid>

                    <Divider className={classes.dividerBelow} />
                </CardContent>
                <CardActions >
                    { getActionButton() }
                </CardActions>
            </Card>
        </Grid>
    );
};

export const Cars: React.FunctionComponent<{}> = () => {
    const [modalCar, setModalCar] = useState<Car | null>(null);
    const [rentalModalIsShown, setRentalModalIsShown] = useState(false);
    const [returnModalIsShow, setReturnModalIsShow] = useState(false);
    const [rentedSuccessMessageIsSnown, showRentedSuccessMessage] = useState(false);
    const [errorRentalMessage, setErrorRentalMessage] = useState('');

    const rentCar = (car: Car) => {
        setModalCar(car);
        setRentalModalIsShown(true);
    };
    const returnCar = (car: Car) => {
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
                    setErrorRentalMessage('You cannot rent this car');
                } else {
                    showRentedSuccessMessage(true);
                    getCarsData.loadCars();
                }

                handleRentalModalClose();
            });
    };

    const getCarsData = getCars();
    const classes = useStyles();

    return (
        <>
            { getCarsData.isFetching && (
                <div className={classes.spinnerWrapper}>
                    <CircularProgress size={60} />
                </div>
            ) }
            <Grid container spacing={3}>{
                getCarsData.cars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        rentCar={rentCar}
                        returnCar={returnCar}
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
            <Notification
                open={rentedSuccessMessageIsSnown}
                message="You rented a car!"
                handleClose={() => showRentedSuccessMessage(false)}
                variant="success"
            />
            <Notification
                open={!!errorRentalMessage}
                message={errorRentalMessage}
                handleClose={() => setErrorRentalMessage('')}
                variant="error"
            />
        </>
    );
};
