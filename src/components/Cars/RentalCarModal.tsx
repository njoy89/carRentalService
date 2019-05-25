import * as React from 'react';
import { useState } from 'react';
import { Car } from '../../types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import en from 'date-fns/esm/locale/en-GB';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

interface RentalCarModalProps {
    show: boolean;
    handleClose: () => void;
    handleOk: (startDate: Date, endDate: Date) => void;
    car: Car;
}

export const RentalCarModal: React.FunctionComponent<RentalCarModalProps> = ({
    show,
    handleClose,
    handleOk,
    car
}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Rent a car</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to rent <strong>{ car.model }</strong>. Select the dates of your rental.
                </DialogContentText>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={en}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <DatePicker
                                margin="normal"
                                label="Start Date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                disablePast
                                autoOk
                                maxDate={endDate}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                margin="normal"
                                label="End Date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                autoOk
                                minDate={startDate}
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button
                    onClick={() => {
                        if (startDate && endDate) {
                            handleOk(startDate, endDate);
                        }
                    }}
                    color="primary"
                    variant="outlined"
                    disabled={startDate === null || endDate === null}
                >Rent</Button>
            </DialogActions>
        </Dialog>
    );
};
