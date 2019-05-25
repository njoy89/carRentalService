import * as React from 'react';
import { Car, MyRental } from "../../types";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        bold: { fontWeight: 700 },
    }),
);


interface SettleBalanceModalProps {
    show: boolean;
    handleClose: () => void;
    handleOk: (rental: MyRental) => void;
    car: Car;
    rental: MyRental;
}

export const SettleBalanceModal: React.FunctionComponent<SettleBalanceModalProps> = ({
    show,
    handleClose,
    handleOk,
    car,
    rental
}) => {
    const classes = useStyles();
    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Return a car</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to settle the balance
                    (<strong className={classes.bold}>{ Math.abs(rental.subcharge) } PLN</strong>)
                    of the rental of <strong className={classes.bold}>{ car.model }</strong>.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button
                    onClick={() => handleOk(rental)}
                    color="primary"
                    variant="outlined"
                >Settle</Button>
            </DialogActions>
        </Dialog>
    );
};
