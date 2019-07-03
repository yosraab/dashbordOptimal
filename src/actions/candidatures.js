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
        status
        _id
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

export const updateCand = (id, status,token, refreshToken, callback1, callback2) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  return await axios({
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
          mutation changeCandidatStatus ($id:ID!,$status:String!){ 
            changeCandidatStatus(id:$id,status:$status){ 
                fullName
                status
                email
                cvPath
            }
            }
            `,
          variables: {
            id: id,
            status: status
          },
        })
  
  })
    .then(response => {
     
        dispatch({ type: 'EDIT_CANDIDATURE_SUCCESS', payload: response.data });
        callback1();
     
    })
    .catch(error => {
      dispatch({ type: 'EDIT_CANDIDATURE_FAILURE', payload: error });
      callback2();
    });
};
