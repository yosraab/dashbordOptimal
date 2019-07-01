function produits(state = [], action) {
  switch (action.type) {
    case 'FETCH_CATEGORIES_SUCCESS': {
      return action.payload;
    }
    case 'FETCH_CATEGORIES_FAMILY_SUCCESS': {
      return action.payload;
    }
    case 'FETCH_PRODUCTS_SUCCESS': {
      return action.payload;
    }
    case 'FETCH_CATEGORIES_FAILURE': {
      return [];
    }

    default:
      return state;
  }
}

export default produits;
