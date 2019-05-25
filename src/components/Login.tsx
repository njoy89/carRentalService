import * as React from 'react';
import { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { Notification } from './Notification';
import ClientService from '../services/clientService';

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            margin: '40px auto',
            width: 600
        },
        form: {
            padding: 20
        }
    })
);

const LoginComponent: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
    const classes = useStyles();

    const [clientId, setClientId] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (ClientService.isAuthenticated()) {
            history.push('/cars');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const clientId = e.target.value;
        setClientId(clientId);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        ClientService
            .getClient(clientId)
            .then((response) => {
                if (typeof response === 'string') {
                    setLoginError(response);
                } else {
                    ClientService.setId(clientId);
                    history.push('/cars');
                }
            });
    };

    return (
        <div>
            <Paper className={classes.container}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="clientId">Client ID</InputLabel>
                        <Input id="clientId" name="clientId" autoFocus onChange={handleChange} value={clientId} />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Log in
                    </Button>
                </form>
            </Paper>
            <Notification
                open={!!loginError}
                message={loginError}
                handleClose={() => setLoginError('')}
                variant="error"
            />
        </div>
    );
};

export const Login = withRouter(LoginComponent);
