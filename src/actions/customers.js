import axios from 'axios';
import { remoteAPI } from '../config';

export function fetchCustomers(token) {
  return async dispatch => {
    dispatch({ type: 'FETCH_CUSTOMERS_REQUEST' });
    await axios
      .get(`${remoteAPI}/clients`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        dispatch({ type: 'FETCH_CUSTOMERS_SUCCESS', payload: response.data });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'FETCH_CUSTOMERS_FAILURE' });
      });
  };
}

export const createClient = (data) => (dispatch, getState) => {
  
  
        dispatch({ type: 'ADD_CUSTOMER_SUCCESS', payload: data });
     
  
};

export const deleteClient = data => async (dispatch, getState) => {
 
        dispatch({ type: 'DELETE_CLIENT_SUCCESS', payload: data });
      
   
};

export const updateClient = (data) => async (dispatch, getState) => {

        dispatch({ type: 'UPDATE_CLIENT_SUCCESS', payload: data });
    
};