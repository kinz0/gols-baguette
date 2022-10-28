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
        <Alert className="my-3" variant="success">
          <Row>
            <Col  className="d-flex flex-row">
              <h4 className="mt-3">{product}已加入購物車 </h4>
            </Col>
            <Col className="d-flex flex-row-reverse">
              <Button className="btn-secondary" type="button" onClick={() => setProduct("")}>
                點擊繼續掃描
              </Button>
            </Col>
          </Row>
        </Alert>
      )}

      <h3 className="mt-5 mb-3">
        <i className="fas fa-cart-shopping"></i>
      </h3>

      <Table bordered hover>
        <thead className="table-active">
          <tr>
            <th>產品</th>
            <th style={{width: 120}}>數量</th>
            <th style={{width: 78}}></th>
          </tr>
        </thead>
        {cartItems && (
          <tbody>
            {cartItems.map((item) => (
              <tr className="table-secondary" key={item.product}>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button className="btn-outline-danger btn-sm" type="button" onClick={() => removeFromCartHandler(item.product)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>

      <Button onClick={purchaseHandler} className="btn-outline-success" disabled={cartItems.length === 0} type="button" >
        確定
      </Button>

    </Container>
  );
}

export default OrderScannerscreen;
