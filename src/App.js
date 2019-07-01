import React from 'react';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import appReducer from '../src/reducers';
import Routes from './routes';
import './App.css';

function App() {
    const store = createStore(appReducer, {}, applyMiddleware(ReduxThunk, logger));
  return (
      <Provider store={store}>
          <Routes />
      </Provider>
  );
}

export default App;

