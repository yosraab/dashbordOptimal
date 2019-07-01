// @flow
// $FlowFixMe
import axios from 'axios';
import { remoteAPI } from '../config';

export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';

export const GET_SETTINGS_REQUEST = 'GET_SETTINGS_REQUEST';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

export const fetchSettings = () => async (dispatch, getState) => {
  dispatch({ type: GET_SETTINGS_REQUEST });
  const {
    auth: { token },
  } = getState();

  await axios({
    url: `${remoteAPI}/settings`,
    method: 'get',
    headers: {
      Authorization: token,
    },
  })
    .then(response => {
      dispatch({ type: GET_SETTINGS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: GET_SETTINGS_FAILURE, payload: error });
    });
};

export const editSettings = data => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  dispatch({ type: UPDATE_SETTINGS_REQUEST });
  return await axios
    .put(`${remoteAPI}/settings`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      dispatch({ type: UPDATE_SETTINGS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: UPDATE_SETTINGS_FAILURE, payload: error });
    });
};
