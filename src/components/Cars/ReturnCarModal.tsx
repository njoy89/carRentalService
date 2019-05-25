import * as React from 'react';
import { useState } from 'react';
import { Car } from '../../types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface RentalCarModalProps {
    show: boolean;
    handleClose: () => void;
    handleOk: (comments: string) => void;
    car: Car;
}

export const ReturnCarModal: React.FunctionComponent<RentalCarModalProps> = ({
    show,
    handleClose,
    handleOk,
    car
}) => {
    const [comments, setComments] = useState('');

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComments(e.currentTarget.value);
    };

    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Return a car</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to return <strong>{ car.model }</strong>. We'd really appreciate your feedback!
                </DialogContentText>
                <TextField
                    label="Comment"
                    multiline
                    rows="4"
                    margin="normal"
                    variant="outlined"
                    onChange={handleCommentChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button
                    onClick={() => handleOk(comments)}
                    color="primary"
                    variant="outlined"
                    disabled={comments.trim() === ''}
                >Return</Button>
            </DialogActions>
        </Dialog>
    );
};
