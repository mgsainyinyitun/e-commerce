import {
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_REQUEST_FAIL,
  PRODUCT_DETAIL_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_LIST_REQUEST_SUCCESS,
} from "../constants/productConstant";

export const productListReducer = (
  state = {
    loading: true,
    products: [],
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_REQUEST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true };
    case PRODUCT_DETAIL_REQUEST_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};