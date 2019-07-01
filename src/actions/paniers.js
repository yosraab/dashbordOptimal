import axios from 'axios';
import { remoteAPI } from '../config';

export function fetchPaniers(token) {
  return async dispatch => {
    dispatch({ type: 'FETCH_PANIERS_REQUEST' });
    await axios
      .get(`${remoteAPI}/paniers`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        dispatch({ type: 'FETCH_PANIERS_SUCCESS', payload: response.data });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'FETCH_PANIERS_FAILURE' });
      });
  };
}
