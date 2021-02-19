import Axios from "axios";
import {
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_REQUEST_FAIL,
  PRODUCT_DETAIL_REQUEST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST_FAIL,
  PRODUCT_LIST_REQUEST_SUCCESS,
} from "../constants/productConstant";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/products");
    dispatch({
      type: PRODUCT_LIST_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_REQUEST_FAIL,
      payload: error.message,
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAIL_REQUEST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
