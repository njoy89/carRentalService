import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Cars } from './Cars/Cars';
import { Login } from './Login/Login';
import Layout from './Layout';

export const App: React.FunctionComponent<{}> = () => {
    return (
        <Router>
            <Layout>
                <div>
                    <Route path="/" exact component={Login} />
                    <Route path="/cars" component={Cars} />
                </div>
            </Layout>
        </Router>
    );
};
