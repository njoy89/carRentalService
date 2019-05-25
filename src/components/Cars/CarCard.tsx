import * as React from "react";

import ClientService from '../../services/clientService';
import { Car, CarStatus } from "../../types";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
    })
);

interface CarCardProps {
    car: Car;
    isRentedByCurrentUser: boolean;
    handleRentCarClick: (car: Car) => void;
    handleReturnCarClick: (car: Car) => void;
}

export const CarCard: React.FunctionComponent<CarCardProps> = ({
    car,
    handleRentCarClick,
    handleReturnCarClick,
    isRentedByCurrentUser
}) => {
    const classes = useStyles();
    const clientIsAuthenticated = ClientService.isAuthenticated();

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
        const carStatus = car.carStatus;
        const carIsRentedBySomeoneElse = carStatus === CarStatus.RENTED && !isRentedByCurrentUser;

        if (carStatus === CarStatus.AVAILABLE || carIsRentedBySomeoneElse) {
            return (
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    className={classes.actionButton}
                    onClick={() => handleRentCarClick(car)}
                    disabled={carIsRentedBySomeoneElse}
                >Rent</Button>
            );
        } else if (carStatus === CarStatus.RENTED) {
            return (
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    className={classes.actionButton}
                    onClick={() => handleReturnCarClick(car)}
                >Return</Button>
            );
        } else if (carStatus === CarStatus.UNAVAILABLE) {
            return (
                <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    className={classes.actionButton}
                    disabled
                >Rent</Button>
            );
        } else {
            return null;
        }
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

                    { clientIsAuthenticated && (
                        <Divider className={classes.dividerBelow} />
                    ) }
                </CardContent>
                { clientIsAuthenticated && (
                    <CardActions >
                        { getActionButton() }
                    </CardActions>
                ) }
            </Card>
        </Grid>
    );
};
