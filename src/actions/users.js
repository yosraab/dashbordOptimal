import axios from 'axios';
import { remoteAPI } from '../config';
const { createApolloFetch } = require('apollo-fetch');
export const USER_INFO_SAVED = 'USER_INFO_SAVED';
export const USER_PWD_SAVED = 'USER_PWD_SAVED';
export const USER_INFO_CLEARED = 'USER_INFO_CLEARED';
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const FETCH_USERS_BYNAME_SUCCESS = 'FETCH_USERS_BYNAME_SUCCESS';
export const FETCH_USERS_BYNAME_FAILURE = 'FETCH_USERS_BYNAME_FAILURE';

const fetch = createApolloFetch({
  uri: 'http://localhost:5000/graphql',
});


export const fetchAllUsers = token => dispatch => {
  dispatch({ type: FETCH_USERS_REQUEST });
  return fetch({
    query: ` query {
      getAllUsers{
        _id
        firstName
        lastName
        email
      }

    }
    `
  }).then(response => {

    console.log(response)
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.getAllUsers });

  })
    .catch(error => {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error });
    });
};

export const addUser = (data, callback1, callback2) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  return axios({
    url: `${remoteAPI}/user`,
    method: 'post',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => {
      if (response.status === 201) {
        dispatch({ type: ADD_USER_SUCCESS, payload: response });
        callback1();
      } else {
        dispatch({ type: ADD_USER_FAILURE, payload: response });
        callback2();
      }
    })
    .catch(error => {
      dispatch({ type: ADD_USER_FAILURE, payload: error });
      callback2();
    });
};

export const updateUser = (userId, data, callback1, callback2) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  return axios({
    url: `${remoteAPI}/user/${userId}`,
    method: 'put',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data,
  })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: EDIT_USER_SUCCESS, payload: response.data });
        callback1();
      } else {
        dispatch({ type: EDIT_USER_FAILURE, payload: 'error' });
        callback2();
      }
    })
    .catch(error => {
      dispatch({ type: EDIT_USER_FAILURE, payload: error });
      callback2();
    });
};

export const deleteUser = id => async (dispatch, getState) => {
  dispatch({ type: DELETE_USER_REQUEST });
  const {
    auth: { token },
  } = getState();
  return fetch(`${remoteAPI}/user/${id}`, {
    method: 'delete',
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(() =>
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: { id },
      })
    )
    .catch(err =>
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: {
          message: err.message,
        },
      })
    );
};

export function getUser(userId, token) {
  return dispatch => {
    axios
      .get(`${remoteAPI}/user/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        if (response.status === 200) {
          return dispatch({ type: 'GET_USER_SUCCESS' });
        }
        return response.status;
      })
      .catch(() => {
        dispatch({ type: 'GET_USER_FAILURE' });
      });
  };
}
