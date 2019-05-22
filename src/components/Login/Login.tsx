import * as React from 'react';
import { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import ClientService from '../../services/clientService';

import * as styles from './Login.scss';

const LoginComponent: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
    const [clientId, setClientId] = useState('');

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

        ClientService.setId(clientId);

        history.push('/cars');
    };

    return (
        <div>
            <Paper className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
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
        </div>
    );
};

export const Login = withRouter(LoginComponent);
