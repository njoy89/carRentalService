import * as React from 'react';
import { getClient } from '../../hooks/getClient';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import red from '@material-ui/core/colors/red';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spinnerWrapper: { display: 'flex', justifyContent: 'center' },
        error: { color: red[500] },
        list: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    })
);

export const Profile: React.FunctionComponent<{}> = () => {
    const clientData = getClient();
    const classes = useStyles();

    if (clientData.isFetching) {
        return (
            <div className={classes.spinnerWrapper}>
                <CircularProgress size={60} />
            </div>
        );
    }

    if (clientData.error) {
        return (
            <p className={classes.error}>{ clientData.error }</p>
        )
    }

    const client = clientData.client;

    if (client === null) {
        return null;
    }

    const renderItem = (name: string, value: string) => (
        <ListItem>
            <ListItemText primary={ name } secondary={ value } />
        </ListItem>
    );

    return (
        <List className={classes.list}>
            { renderItem('Name', client.name) }
            { renderItem('Surname', client.surname) }
            { renderItem('E-mail', client.email) }
            { renderItem('Address', client.address) }
        </List>
    );
};
