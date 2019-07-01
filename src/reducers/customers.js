import { combineReducers } from 'redux';
const initalState=[
  {
    'id':0,
    "firstName": "zara",
    "lastName": "zara",
    "email": "zara@gmail.com",
    "companyName": 'MATADOR'
  },
  {
    'id':1,
    "firstName": "zarouk",
    "lastName": "zarouk",
    "email": "zarouk@gmail.com",
    "companyName": 'Zarouk café'
  },
 
]
function customers(state = initalState, action) {
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
