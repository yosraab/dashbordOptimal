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


export const fetchAllUsers = (token, refreshToken) =>async  dispatch => {

  dispatch({ type: FETCH_USERS_REQUEST });
  return await axios('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Headers": '*',
        "x-token": token,
        "x-refresh-token": refreshToken
      },
        data: JSON.stringify({
          query: ` query {
            getAllDevelopers{
              _id
              firstName
              lastName
              email
              local{
                roles
                phone
                address{
                  city
                  country
                  zip
                  street
                }
              }
            }
      
          }
          `
        })

      })
  
  .then(response => {

    console.log(response)
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.data.getAllDevelopers });

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
    url: `${remoteAPI}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
          query: `
            mutation CreateUser($userInput:UserInput!){
              createUser(data:$userInput)
              {
                collection{
                  _id
                  email
                  firstName
                  lastName
                  idThirdParty 
                  local {
                         phone
                   password
                   roles
                   address{
                     street
                city
                zip
                country
              }
                  }
                   deleted
                  _updatedBy
                  _deletedBy
                  createdAt
                  updatedAt
                  
                  }
                  token
                  refreshToken
              }
              
            }
            `,
          variables: {
            userInput: data
          },
        })
  
  })
 .then(response => {
     
        dispatch({ type: ADD_USER_SUCCESS, payload: response });
        callback1();
    
    })
    .catch(error => {
      dispatch({ type: ADD_USER_FAILURE, payload: error });
      callback2();
    });
};

export const updateUser = (id, data,password,token, refreshToken, callback1, callback2) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  return axios({
    url: `${remoteAPI}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      
      "Access-Control-Allow-Headers": '*',
      "x-token": token,
      "x-refresh-token": refreshToken
    },
    data: JSON.stringify({
          query: `
            mutation UpdateBy($id : ID!, $userInput:UserInput!){
              updateBy(id: $id, data:$userInput)
              
              {
                _id
                email
                firstName
                lastName
                idThirdParty 
                local {
                  phone
             password
             roles
             address{
              street
              city
              zip
              country
             }
            }
              }
              
            }
            `,
          variables: {
            id: id,
            userInput: data
          },
        })
  
  })
    .then(response => {
      if(password ){
        axios({
          url: `${remoteAPI}`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
                query: `
                  mutation UpdatePasswordBy($id : ID!, $newPassword:String!){
                    updatePasswordBy(id: $id, newPassword:$newPassword)
                    {
                      
                      _id
                      email
                      firstName
                      lastName
                      idThirdParty 
                      local {
                        phone
                   password
                   roles
                   address{
                    street
                    city
                    zip
                    country
                  }
                      }
                       deleted
                      _updatedBy
                      _deletedBy
                      createdAt
                      updatedAt  
                    }
                    
                  }
                  `,
                variables: {
                  id:id,
                  newPassword: password
                },
              })
        
        })
      }
        dispatch({ type: EDIT_USER_SUCCESS, payload: response.data });
        callback1();
     
    })
    .catch(error => {
      dispatch({ type: EDIT_USER_FAILURE, payload: error });
      callback2();
    });
};

export const deleteUser = (id, token, refreshToken )=> async (dispatch, getState) => {
  dispatch({ type: DELETE_USER_REQUEST });
  const {
    auth: { token },
  } = getState();
  return axios({
    url: `${remoteAPI}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers": '*',
      "x-token": token,
      "x-refresh-token": refreshToken
    },
    data : JSON.stringify({
      query: `
      mutation DeleteUser ($id:ID!) {
      
        deleteUser(id:$id) {
          _id
          email
          firstName
          lastName
          idThirdParty 
          local {
            phone
           password
           roles
              address{
                street
                city
                zip
                country
              }
          }
           deleted
          _updatedBy
          _deletedBy
          createdAt
          updatedAt  
        }
      
      }
      

    ` , variables :{
      id: id
    }
    })
  
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

