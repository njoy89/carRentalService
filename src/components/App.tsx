import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Cars } from './Cars/Cars';
import { Login } from './Login/Login';
import { MyRentals } from './MyRentals/MyRentals';
import { Profile } from './Profile/Profile';
import { PrivateRoute } from './PrivateRoute';
import { NotFound } from './NotFound';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Layout from './Layout';

const theme = createMuiTheme({
    palette: {
        primary: { main: blue[500] }
    },
});

export const App: React.FunctionComponent<{}> = () => (
    <Router>
        <ThemeProvider theme={theme}>
            <Layout>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/cars" />
                        </Route>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/cars" component={Cars} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute exact path="/myRentals" component={MyRentals} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Layout>
        </ThemeProvider>
    </Router>
);
