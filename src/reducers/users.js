/* eslint-disable no-underscore-dangle */
import { combineReducers } from 'redux';
import { ADD_USER_SUCCESS, FETCH_USERS_SUCCESS, FETCH_USERS_BYNAME_SUCCESS } from '../actions/users';

function users(state = [], action) {
  switch (action.type) {
    case FETCH_USERS_BYNAME_SUCCESS:
      return action.payload.users;
    case FETCH_USERS_SUCCESS:
      return action.payload;
    case ADD_USER_SUCCESS:
      return [...state, action.payload];
    // case DELETE_USER_SUCCESS:
    //   return deleteIDFromArrayOfIDs(state._id, action.payload.users);
    default:
      return state;
  }
}

export default users;
