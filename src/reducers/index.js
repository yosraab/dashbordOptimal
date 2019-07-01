import { combineReducers } from 'redux';

import auth from './auth';
import paniers from './paniers';
import customers from './customers';
import candidatures from './candidatures';
import produits from './produits';
import settings from './settings';
import users from './users';

const rootReducer = combineReducers({
  auth,
  customers,
  candidatures,
  paniers,
  produits,
  settings,
  users,
});

export default rootReducer;
