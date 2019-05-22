import * as React from 'react';
import { getCars } from '../../hooks/getCars';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as styles from './Cars.scss';

export const Cars: React.FunctionComponent<{}> = () => {
    const cars = getCars();

    return (
        <Paper className={styles.container}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Model</TableCell>
                        <TableCell>Body Type</TableCell>
                        <TableCell align="right">Release Year</TableCell>
                        <TableCell>Car Status</TableCell>
                        <TableCell align="right">Price per day</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cars.map(car => (
                        <TableRow key={car.id} hover>
                            <TableCell component="th" scope="row">
                                {car.model}
                            </TableCell>
                            <TableCell>{car.carBodyType}</TableCell>
                            <TableCell align="right">{car.releaseYear}</TableCell>
                            <TableCell>{car.carStatus}</TableCell>
                            <TableCell align="right">{car.amount} PLN</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
};
