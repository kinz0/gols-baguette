import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const addToCart = (product, user, qty) => async (dispatch, getState) => {
    // API call here
    // dispatch to Reducer
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: product,
          quantity: qty,
        },
      });

    // local Storage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (product) => async (dispatch, getState) => {
    // API call here
    // dispatch to Reducer
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: product
      });

    // local Storage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};