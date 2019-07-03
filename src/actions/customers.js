import axios from 'axios';
import { remoteAPI } from '../config';


export function  fetchCustomers(token, refreshToken) {
  return async dispatch => {
    dispatch({ type: 'FETCH_CUSTOMERS_REQUEST' });
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
          getAllUsers{
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
        dispatch({ type: 'FETCH_CUSTOMERS_SUCCESS', payload: response.data.data.getAllUsers });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'FETCH_CUSTOMERS_FAILURE' });
      });
  };
}

export const addClient = (data, callback1, callback2) => async (dispatch, getState) => {
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
     
        dispatch({ type: 'ADD_CLIENT_SUCCESS', payload: response });
        callback1();
    
    })
    .catch(error => {
      dispatch({ type: 'ADD_CLIENT_FAILURE', payload: error });
      callback2();
    });
};

export const updateCustomer = (id, data,password,token, refreshToken, callback1, callback2) => async (dispatch, getState) => {
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
        dispatch({ type: 'EDIT_CLIENT_SUCCESS', payload: response.data });
        callback1();
     
    })
    .catch(error => {
      dispatch({ type: 'EDIT_CLIENT_FAILURE', payload: error });
      callback2();
    });
};


export const deleteClient = (id, token, refreshToken )=> async (dispatch, getState) => {
  console.log(id)
  dispatch({ type:'DELETE_CLIENT_REQUEST' });
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
    .then((response) =>
      dispatch({
        type:'DELETE_CLIENT_SUCCESS',
        payload: response.data
      })
    )
    .catch(err =>
      dispatch({
        type: 'DELETE_CLIENT_FAILURE',
        payload: {
          message: err.message,
        },
      })
    );
};

