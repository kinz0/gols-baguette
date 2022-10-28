import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import {
  Container,
  Alert,
  Table,
  Row,
  Col,
  Button,
  ListGroup,
  Nav,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { QrReader } from "react-qr-reader";

import { addToCart, removeFromCart } from "../actions/cartActions";

function OrderScannerscreen({ match, history }) {
  const [product, setProduct] = useState("");
  const user = match.params.user;

  // Redux setup
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // add to cart
  useEffect(() => {
    if (product !== "") {
      dispatch(addToCart(product, user, 1));
    }
  }, [dispatch, product]);

  // remove from cart
  const removeFromCartHandler = (product) => {dispatch(removeFromCart(product))}

  // purchase handler, when user confirm their cart
  const purchaseHandler = () => {
    history.push('/confirmation')
  }

  return (
    <Container>
      <h3 className="my-3">{user}的下單頁面</h3>
      <h5 className="my-3">請掃描產品種類二維碼</h5>
      {product === "" ? (
        <>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (!!result) {
                setProduct((prev) => (prev = result?.text));
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "100%" }}
          />

          <h1 className="my-3 text-center">請對準產品二維碼</h1>
        </>
      ) : (
        <p>Under Development...Should be directing to a product listing page</p>
      )}

    </Container>
  );
}

export default OrderScannerscreen;
