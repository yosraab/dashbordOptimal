import { combineReducers } from 'redux';

function customers(state = [], action) {
  switch (action.type) {
    case 'FETCH_CUSTOMERS_SUCCESS': {
      return action.payload;
    }
    case 'ADD_CUSTOMER_SUCCESS': {
      return state.concat([action.payload]) 
    }
    case 'DELETE_CLIENT_SUCCESS':{
    
    return state.filter((item, index) => index !== action.payload)
    }
    case 'UPDATE_CLIENT_SUCCESS':{
    console.log('jjjjjjjj', action.payload)
      return state.map((item, index) => index === action.payload.id? action.payload : item)
      }
    default:
      return state;
  }
}

export default customers;
