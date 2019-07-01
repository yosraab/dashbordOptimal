import axios from 'axios';
import { remoteAPI, fetch } from '../config';

export function fetchCandidatures(token) {
  return async dispatch => {
    dispatch({ type: 'FETCH_CANDIDATURES_REQUEST' });
    await fetch({
      query: ` query {
        getAllCandidats{
          fullName
          email
          cvPath
        
        }
        }
      `
    })
      .then(response => {
        dispatch({ type: 'FETCH_CANDIDATURES_SUCCESS', payload: response.data.getAllCandidats });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'FETCH_CANDIDATURE_FAILURE' });
      });
  };
}

export const createCopy = (clientInformations, callback, callbackFailure) => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  return axios({
    url: `${remoteAPI}/copy`,
    method: 'post',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: clientInformations,
  })
    .then(response => {
      if (response.status === 201) {
        dispatch({ type: 'CREATE_CANDIDATURE_SUCCESS', payload: response.data });
        callback(response.data);
      } else {
        callbackFailure();
      }
    })
    .catch(error => {
      callbackFailure();
      dispatch({ type: 'CREATE_CANDIDATURE_FAILURE', payload: error });
    });
};

export const deleteCopy = copyId => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  return await axios
    .delete(`${remoteAPI}/copy/${copyId}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 204) {
        dispatch({ type: 'DELETE_CANDIDATURE_SUCCESS', payload: response.data });
      }
    })
    .catch(error => {
      dispatch({ type: 'DELETE_CANDIDATURE_FAILURE', payload: error });
    });
};

export const updateCopy = (copyId, data) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  return await axios
    .put(`${remoteAPI}/copy/${copyId}`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: 'UPDATE_CANDIDATURE_SUCCESS', payload: response.data });
      }
    })
    .catch(() => {
      dispatch({ type: 'UPDATE_CANDIDATURE_FAILURE' });
    });
};
