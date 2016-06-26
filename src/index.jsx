import React from 'react';
import ReactDom from 'react-dom';
import {Route, Router, hashHistory} from 'react-router';
import io from 'socket.io-client';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import remoteActionMiddleware from './remote_action_middleware';
import {setState} from './action_creators';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', (state) => {
  store.dispatch({type: 'SET_STATE', state});
});


const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <Route component={App}>
  <Route path='/results' component={ResultsContainer} />
  <Route path='/' component={VotingContainer} />
</Route>;

ReactDom.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
    document.getElementById('app'));
