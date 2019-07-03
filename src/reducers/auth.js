import { combineReducers } from 'redux';
import { LOGIN_FAILURE, LOGIN_SUCCESS, SIGNOUT, SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../actions/actionTypes';

const initialState =
  typeof localStorage !== `undefined`
    ? {
        user: JSON.parse(localStorage.getItem('login')) ? JSON.parse(localStorage.getItem('login')).collection : null,
        token: JSON.parse(localStorage.getItem('login')) ? JSON.parse(localStorage.getItem('login')).token : null,
        refreshToken: JSON.parse(localStorage.getItem('login')) ? JSON.parse(localStorage.getItem('login')).refreshToken : null,
      }
    : {
        user: null,
        token: null,
        refreshToken: null
      };

function user(state = initialState.user, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.collection;
    case SIGNUP_SUCCESS:
      return action.payload.collection;
    case SIGNOUT:
      return null;
    case LOGIN_FAILURE:
      return null;
    case SIGNUP_FAILURE:
      return null;
    default:
      return state;
  }
}

function token(state = initialState.token, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.token;
    case SIGNUP_SUCCESS:
      return action.payload.token;
    case SIGNOUT:
      return null;
    case LOGIN_FAILURE:
      return null;
    case SIGNUP_FAILURE:
      return null;
    default:
      return state;
  }
}

function refreshToken(state = initialState.refreshToken, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.refreshToken;
    case SIGNUP_SUCCESS:
      return action.payload.refreshToken;
    case SIGNOUT:
      return null;
    case LOGIN_FAILURE:
      return null;
    case SIGNUP_FAILURE:
      return null;
    default:
      return state;
  }
}


export default combineReducers({ user, token, refreshToken });
