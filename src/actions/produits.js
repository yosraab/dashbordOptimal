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

export const deleteProduct = productId => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  return axios({
    url: `${remoteAPI}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({
      query: `
      mutation deleteProductById ($id:ID!) {
      
          deleteProductById(id:$id)
   
      }
      

    ` , variables :{
      id: productId
    }
    })
  
  })
    .then(response => {
     
        dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: response.data });
     
    })
    .catch(error => {
      dispatch({ type: 'DELETE_PRODUCT_FAILURE', payload: error });
    });
};

export const updateProduct = (productId, data, callback, callback2) => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  return axios({
    url: `${remoteAPI}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({
      query: `
      mutation UpdateProduct($id: ID!, $data:ProductInput!) {
        updateProduct(id: $id, data:$data ) {
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
      id:productId,
      data: data
    }
    })
  
  })
    .then(response => {
        dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: response.data });
        callback()
    })
    .catch(() => {
      dispatch({ type: 'UPDATE_PRODUCT_FAILURE' });
      callback2()
    });
};
