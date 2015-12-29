import axios from 'axios';
import { combineReducers } from 'redux';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

const initialState = {
  collection: {
    "total": 0,
    "per_page": 0,
    "current_page": 0,
    "last_page": 0,
    "from": 0,
    "to": 0,
    data: []
  },

  isFetchingProducts: false,
  isFetchingProductsError: false
};

export function getProducts() {
  return (dispatch, getState) => {
    const state = getState();

    if( state.products.collection.isFetchingProducts ) {
      return;
    }

    dispatch({ type: GET_PRODUCTS });

    return axios
      .get(`products`)
      .then((res) => dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data
      }))
      .catch((res) => dispatch({
        type: GET_PRODUCTS_ERROR,
        error: true
      }));

  }
}

export default (state = initialState, action) => {
  switch( action.type ) {
    case GET_PRODUCTS:
      return {
        ...state,
        isFetchingProducts: true,
        isFetchingProductsError: false
      };

      case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        collection: { ...action.payload },
        isFetchingProducts: false,
        isFetchingProductsError: false
      };

      case GET_PRODUCTS_ERROR:
        return {
          ...state,
          isFetchingProducts: false,
          isFetchingProductsError: true
        }

      default:
        return state;
  }
}

