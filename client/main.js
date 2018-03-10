import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from "react-apollo/";
import {getOperationAST} from "graphql";
import {WebSocketLink} from "apollo-link-ws";
import * as ApolloLink from "apollo-link";
// Containers
import Full from './containers/Full/'
// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

const history = createBrowserHistory();
// Apollo 2.0 now uses the extensible "ApolloLink" (the following does not rely on Meteor)


/* Initialize Apollo Client for GraphQL */

// You might want to set these manually if you're running your server somewhere else
const httpUri = Meteor.absoluteUrl('graphql'); // http://localhost:3000/graphql
const wsUri = Meteor.absoluteUrl('subscriptions').replace(/^http/, 'ws'); // ws://localhost:3000/subscriptions

// Apollo 2.0 now uses the extensible "ApolloLink" (the following does not rely on Meteor)

const link = ApolloLink.split(
    operation => {
        const operationAST = getOperationAST(operation.query, operation.operationName);
        return !!operationAST && operationAST.operation === 'subscription';
    },
    new WebSocketLink({
        uri: wsUri,
        options: {
            reconnect: true, // tells client to reconnect websocket after being disconnected (which will happen after a hot-reload)
            // // might be helpful if you want to carry login state from client
            // // it is recommended you use the secure version of websockets (wss) when transporting sensitive login information
            // connectionParams: {
            // 	authToken: localStorage.getItem("Meteor.loginToken")
            // }
        }
    }),
    new HttpLink({ uri: httpUri })
);

const cache = new InMemoryCache(window.__APOLLO_STATE);

const client = new ApolloClient({
    link,
    cache
});

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <HashRouter history={history}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login}/>
          <Route exact path="/register" name="Register Page" component={Register}/>
          <Route exact path="/404" name="Page 404" component={Page404}/>
          <Route exact path="/500" name="Page 500" component={Page500}/>
          <Route path="/" name="Home" component={Full}/>
        </Switch>
      </HashRouter>
    </ApolloProvider>,
    document.getElementById('root'));
});
