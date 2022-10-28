import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Alert,
  Table,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { QrReader } from "react-qr-reader";

function RedisOrderScannerscreen({ match, history }) {
  const [product, setProduct] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const user = match.params.user;
  const quantity = 1;

  //////////////////////////////* Redis setup *//////////////////////////////

  // SyncTree API: addToCart (Redis)
  async function addToCart() {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/cfsc/addtocart",
      { user: user, addToCart: [{ product: product, quantity: quantity }] },
      config
    );

    setCartItems((prev) => (prev = data.cartItems));
  }

  // SyncTree API: Get Cart (Redis)
  async function getCart() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/cfsc/getcart", { user: user }, config);

    setCartItems((prev) => (prev = data.cartItems));
  }

  // Get Cart (when user reload page)
  useEffect(() => {
    getCart();
    console.log("Order Scanner Page: Get Cart");
  }, []);

  // addToCart
  useEffect(() => {
    if (product !== "") {
      addToCart();
      console.log("Added to Cart")
    }
  }, [product]);

  console.log("Debug: Cart: ", cartItems);

  // Handler: Remover From Cart
  const removeFromCartHandler = (product) => {};

  //////////////////////////////* End of Redis setup *//////////////////////////////

  // Handler: Cart Confirmation, when user confirm their cart
  const confirmationHandler = () => {
    history.push(`/confirmation/${user}`);
  };

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
            <Col className="d-flex flex-row">
              <h4 className="mt-3">「{product}」已加入購物車 </h4>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-row">
              <Button
                className="btn-secondary m-3"
                type="button"
                onClick={() => setProduct("")}
              >
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
            <th style={{ width: 120 }}>數量</th>
            <th style={{ width: 78 }}></th>
          </tr>
        </thead>
        {cartItems.length !== 0 ? (
          <tbody>
            {cartItems.map((item) => (
              <tr className="table-secondary" key={item.product}>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button
                    className="btn-outline-danger btn-sm"
                    type="button"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </Table>

      <Button
        onClick={confirmationHandler}
        className="btn-outline-success"
        disabled={cartItems.length === 0}
        type="button"
      >
        確認下單
      </Button>
    </Container>
  );
}

export default RedisOrderScannerscreen;
