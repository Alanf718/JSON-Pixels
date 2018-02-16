// const express = require('express');
// // const ReactDOMServer = require('react-dom/server');
// const app = express();

import ReactDOMServer from 'react-dom/server';
import React from 'react';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const app = express();

import reducers from '../client/reducers';
import { SharedRoutes } from '../shared';

/* eslint-disable */ // no-console

const renderPage = (html, preloadedState) => `
    <!doctype html>
    <html>
      <head>
        <!--<link rel="icon" href="/dist/favicon.ico" type="image/ico" />-->
      </head>
      <body>
        <div id="entry">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
        </script>
        <script src="/assets/js/common.js"></script>
        <script src="/assets/app.web.js"></script>
      </body>
    </html>
`;

app.use('/assets', express.static('dist/web'));

app.get('*', (req, res ) => {
    const store =  createStore(reducers);

    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                <SharedRoutes/>
            </StaticRouter>
        </Provider>
    );
    const context = {};
    const foundPath = false;

    if (context.url) {
        res.redirect(context.status, 'http://' + req.headers.host + context.url);
    } else if (foundPath && foundPath.path === '/404') {
        res.status(404).send(renderPage(html, {}));
    } else {
        res.send(renderPage(html, {}));
    }
});

app.listen(8080, () => {
    console.log('express server running at 8080');
});
