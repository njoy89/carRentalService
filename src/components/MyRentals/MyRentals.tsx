import * as React from 'react';
import { useMemo, memo, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";

import { Notification } from '../Notification';
import { ReturnCarModal } from '../Cars/ReturnCarModal';
import { SettleBalanceModal } from './SettleBalanceModal';

import { Car, MyRental, RentalStatus } from '../../types';
import { getMyRentals } from "../../hooks/getMyRentals";
import { getCars } from "../../hooks/getCars";
import CarService from "../../services/carService";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
        },
        table: { minWidth: 650 },
        spinnerWrapper: { display: 'flex', justifyContent: 'center' },
        empty: { color: red[500] },
        rented: { color: orange[500], fontWeight: 700 },
        notSettled: { color: red[500], fontWeight: 700 },
        settled: { color: green[500], fontWeight: 700 },
    }),
);

const getCarMapping = (cars: Car[]): Map<string, Car> => new Map(cars.map(car => [car.id, car]));

export const MyRentals: React.FunctionComponent<{}> = memo(() => {
    const classes = useStyles();

    const myCarsData = getCars();
    const myRentalsData = getMyRentals();
    const updateData = () => {
        myCarsData.loadData();
        myRentalsData.loadData();
    };
    const carMapping = useMemo<Map<string, Car>>(() => getCarMapping(myCarsData.cars), [myCarsData.cars]);
    const [modalCar, setModalCar] = useState<Car | null>(null);
    const [modalRental, setModalRental] = useState<MyRental | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [returnModalIsShow, setReturnModalIsShow] = useState(false);
    const [settleBalanceModalIsShow, setSettleBalanceModalIsShow] = useState(false);

    if (myCarsData.isFetching || myRentalsData.isFetching) {
        return (
            <div className={classes.spinnerWrapper}>
                <CircularProgress size={60} />
            </div>
        );
    }

    const nullElement = (
        <span className={classes.empty}>empty</span>
    );

    const renderStatus = (status: RentalStatus, subcharge: number) => {
        switch (status) {
            case RentalStatus.RENTED:
                return (
                    <span className={classes.rented}>Rented</span>
                );
            case RentalStatus.RETURNED_BUT_CHARGE_NOT_SETTLED:
                return (
                    <span className={classes.notSettled}>Car has been returned, but the balance is not settled ({ Math.abs(subcharge) } PLN)</span>
                );
            case RentalStatus.RETURNED_AND_CHARGE_SETTLED:
                return (
                    <span className={classes.settled}>Car has been returned, the balance is settled</span>
                );
            default:
                return null;
        }
    };

    const renderActionButton = (rental: MyRental, car?: Car) => {
        if (!car) {
            return nullElement;
        }

        switch (rental.status) {
            case RentalStatus.RENTED:
                return (
                    <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                            setReturnModalIsShow(true);
                            setModalCar(car);
                        }}
                    >Return</Button>
                );
            case RentalStatus.RETURNED_BUT_CHARGE_NOT_SETTLED:
                return (
                    <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                            setSettleBalanceModalIsShow(true);
                            setModalCar(car);
                            setModalRental(rental);
                        }}
                    >Settle</Button>
                );
            default:
                return null;
        }
    };

    const handleReturnModalClose = () => {
        setModalCar(null);
        setReturnModalIsShow(false);
    };

    const handleReturn = (comments: string) => {
        if (modalCar === null) {
            return;
        }

        const myRental = CarService.getMyRentalByCarId(myRentalsData.data, modalCar.id);

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

    const handleSettleBalance = (rental: MyRental) => {
        CarService.settleSubcharge(rental.id)
            .then((response) => {
                if (response === 'OK') {
                    setSuccessMessage('You settled the subcharge!');
                    updateData();
                } else {
                    setErrorMessage('You cannot settled the subcharge!');
                }
                handleReturnModalClose();
            });
    };

    const handleSettleBalanceModalClose = () => {
        setModalCar(null);
        setSettleBalanceModalIsShow(false);
    };

    if (myRentalsData.data.length === 0) {
        return (
            <Typography variant="h6" color="textPrimary" noWrap>
                You have not made any rental yet.
            </Typography>
        );
    }

    return (
        <Paper className={classes.container}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Car</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Rent Date</TableCell>
                        <TableCell>Return Date</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    { myRentalsData.data.map(row => {
                        const car = carMapping.get(row.carId);

                        return <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <Tooltip title={row.carId} placement="top">
                                    <span>{car ? car.model : nullElement}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{row.startDate}</TableCell>
                            <TableCell>{row.endDate}</TableCell>
                            <TableCell>{row.rentDate}</TableCell>
                            <TableCell>{row.returnDate || nullElement}</TableCell>
                            <TableCell align="right">{row.amount} PLN</TableCell>
                            <TableCell>{
                                row.comments ? (
                                    <Tooltip title={row.comments} placement="top">
                                        {renderStatus(row.status, row.subcharge) || <div />}
                                    </Tooltip>
                                ) : renderStatus(row.status, row.subcharge)
                            }</TableCell>
                            <TableCell>{renderActionButton(row, car)}</TableCell>
                        </TableRow>
                    }) }
                </TableBody>
            </Table>
            { modalCar && (
                <ReturnCarModal
                    show={returnModalIsShow}
                    handleClose={handleReturnModalClose}
                    handleOk={handleReturn}
                    car={modalCar}
                />
            ) }
            { modalCar && modalRental && (
                <SettleBalanceModal
                    show={settleBalanceModalIsShow}
                    handleClose={handleSettleBalanceModalClose}
                    handleOk={handleSettleBalance}
                    car={modalCar}
                    rental={modalRental}
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
        </Paper>
    );
});
