import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../client/containers/home';

export const SharedRoutes = () => {
    return (
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Home}/>
        </div>
    );
};
