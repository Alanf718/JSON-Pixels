import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import reducers from './reducers';
// import { Router, Route, browserHistory } from 'react-router';
// import { Route } from 'react-router-dom';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';

// import Home from './containers/home';

const history = createHistory();

const middleware = routerMiddleware(history);
const composeEnhancers = composeWithDevTools({});

const store = createStore(
    // combineReducers({...reducers, routing: routerReducer}),
    reducers,
    composeEnhancers(applyMiddleware(middleware))
);

// const history = syncHistoryWithStore(browserHistory, store);

import './style.scss';
import { SharedRoutes } from '../shared';

ReactDOM.render(
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <SharedRoutes/>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#entry'));

// {/*<div>*/}
// {/*<Route exact path="/" component={Home}/>*/}
// {/*<Route exact path="/login" component={Home}/>*/}
// {/*</div>*/}
