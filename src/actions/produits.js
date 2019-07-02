import axios from 'axios';
import { remoteAPI, fetch } from '../config';



export function fetchCategFamily(token) {
  return async dispatch => {
    dispatch({ type: 'FETCH_CATEGORIES_FAMILY_REQUEST' });
    await fetch({
      query: ` query {
        getAllCategoriesPerFamily {categoryFamily
        AllRealatedCategories}
        }
      `
    })
      .then(response => {

        console.log(response)
        dispatch({ type: 'FETCH_CATEGORIES_FAMILY_SUCCESS', payload: response.data.getAllCategoriesPerFamily });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'FETCH_CATEGORIES_FAMILY_FAILURE' });
      });
  };
}


export function fetchCategories(token, categoryFamily) {
console.log('rrr',categoryFamily )
  return async dispatch => {
    dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
    await fetch({
      query:
        ` query getAllCategoryByFamily($categoryFamily:String!){
          getAllCategoryByFamily(categoryFamily: $categoryFamily){
            categoryName
            categorySlug
          }
     }
     `,
      variables: {
        categoryFamily: categoryFamily,
      },
    })
      .then(response => {

        console.log(response)
        dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data.getAllCategoryByFamily });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'FETCH_CATEGORIES_FAILURE' });
      });
  };
}

export function fetchProduits(token, categorySlug) {

  return async dispatch => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    await fetch({
      query:
        ` query GetAllProductByCategoriesSlugs($categorySlug:String!){
       getAllProductsByCategoriesSlugs(categorySlug:$categorySlug){
        description
        name
        _id
        image
        slug
        categoryName
        categorySlug
        categoryFamily
        manufacturer{
          nameMan
        logoMan
        }
        feature{
          color
          itemCondition
          logo
          offers
          stock
          audience
          brand
        }
     }
     }
     `,
      variables: {
        categorySlug: categorySlug,
      },
    })
      .then(response => {

        console.log(response)
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data.getAllProductsByCategoriesSlugs });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE' });
      });
  };
}


export const createProduct = (data, callback, callbackFailure) => (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();
  console.log('data', data)
  return axios({
    url: `${remoteAPI}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({
      query: `
      mutation AddProduct($data:ProductInput!) {
        addProduct(data:$data ) {
         _id
          name
        description
        categoryName
        categoryFamily
        manufacturer{
          nameMan
        logoMan
        }
        feature{
          color
          itemCondition
          logo
          stock
          audience
          brand
        }
        }
      }

    ` ,variables: {
      data: data
    }
    })
  
  })
    .then(response => {
     console.log(response)
        dispatch({ type: 'CREATE_PRODUCT_SUCCESS', payload: response.data });
        callback(response.data);
     
    })
    .catch(error => {
      callbackFailure();
      dispatch({ type: 'CREATE_PRODUCT_FAILURE', payload: error });
    })
};

export const deleteApplication = appId => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  return axios
    .delete(`${remoteAPI}/application/${appId}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 204) {
        dispatch({ type: 'DELETE_APPLICATION_SUCCESS', payload: response.data });
      }
    })
    .catch(error => {
      dispatch({ type: 'DELETE_APPLICATION_FAILURE', payload: error });
    });
};

export const updateProduct = (productId, data) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  return axios
    .put(`${remoteAPI}`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: 'UPDATE_APPLICATION_SUCCESS', payload: response.data });
      }
    })
    .catch(() => {
      dispatch({ type: 'UPDATE_APPLICATION_FAILURE' });
    });
};
