import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Cars } from './Cars/Cars';
import { Login } from './Login/Login';
import { MyRentals } from './MyRentals/MyRentals';
import { Profile } from './Profile/Profile';
import { PrivateRoute } from './PrivateRoute';
import { NotFound } from './NotFound';
import Layout from './Layout';

export const App: React.FunctionComponent<{}> = () => (
    <Router>
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
    </Router>
);
