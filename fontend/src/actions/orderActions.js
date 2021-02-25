import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
} from "../constants/orderConstants";
import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";

export const createdOrder = (order) => async (dispatch, getState) => {
    console.log("oder is ::",order);
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: order,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    console.log("user auth::",`Bearer ${userInfo.token}`)
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
    dispatch({
      type: CART_EMPTY,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const detailsOrder = orderId => async(dispatch,getState) => {
    console.log("Order ID:'",orderId);
    dispatch({
        type:ORDER_DETAIL_REQUEST,
        payload:orderId,
    });
    const {userSignin:{userInfo}} = getState();
    try {
        const {data} = await Axios.get(`/api/orders/${orderId}`,{
            headers:{authorization:`Bearer ${userInfo.token}`}
        });
        dispatch({
            type:ORDER_DETAIL_SUCCESS,
            payload:data,
        })
        
    } catch (error) {
        const message =  error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({
            type:ORDER_DETAIL_FAIL,
            payload:message,
        })
    }

}