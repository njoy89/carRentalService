import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import ClientService from '../services/clientService';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            ClientService.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);
