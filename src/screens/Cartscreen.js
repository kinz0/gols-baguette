import React, { useEffect } from 'react'
import { Container, Alert, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../actions/cartActions";

function Cartscreen({ match, history }) {
    // assign variables
    const product = match.params.product
    const user = match.params.user
    const qty = 1
    console.log(product)

    // Redux time
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart


    useEffect(() => {
        dispatch(addToCart(product, qty))
    }, [dispatch, product, qty])

  return (
    <div>
      Cart
    </div>
  )
}

export default Cartscreen
