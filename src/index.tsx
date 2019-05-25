import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ClientService from './services/clientService';

import { App } from './components/App';

ClientService.validateSession()
    .then(() => {
        ReactDOM.render(
            <App />,
            document.getElementById('container')
        );
    });
