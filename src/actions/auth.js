import axios from 'axios';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNOUT,
} from './actionTypes';
import { remoteAPI } from '../config';

export function signIn(email, pwd, callback1, callback2) {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

       axios('http://localhost:5000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({
              query: `
            mutation login($email:String!,$password:String!){
              login(email:$email,password:$password){
                collection{
                  _id
                  email
                  firstName
                  lastName
                  idThirdParty
                
                  deleted
                  _updatedBy
                  createdAt
                  updatedAt
                
               
                }
                token
                refreshToken
              }
              
            }
            `,
              variables: {
                  email: email,
                  password:pwd,
              },
          })

      }).then((response) => {

          if (response.status === 200 && !response.data.errors) {
              dispatch({ type: LOGIN_SUCCESS, payload: response.data.data.login});
              if (typeof window.localStorage !== `undefined`) {
                  window.localStorage.setItem('login', JSON.stringify(response.data.data.login));
              }
              callback1()
          } else {
              dispatch({ type: LOGIN_FAILURE, payload: response.data.errors });
              callback2()
          }
      })
  };
}


export function logout(token, callback) {
  return dispatch => {
    dispatch({ type: 'LOGOUT_REQUEST' });
        dispatch({ type: SIGNOUT });
        if (typeof window.localStorage !== `undefined`) {
          window.localStorage.removeItem('login');
        }
        callback()

  };
}
