import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import './style/style.css';

/*
  NOTE: Connections beetwen React, apollo, graphQL
    Apollo provider wraps [React App] <---> Apollo Store <---> GraphQL Server
*/

/*
  Config - dataIdFromObject : it takes every piece of data and runs it into this function,
  - Going and fetch data
  - Look at every single record
  - And use that id field of record to identify that piece of data
  * using this configuration, we need to provide the 'id' to every record on every query 
*/

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}> 
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);