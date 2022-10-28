import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Alert, Table, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { QrReader } from "react-qr-reader";

function RedisOrderScannerscreen({ match, history }) {
  const [product, setProduct] = useState("");
  const [cartItems, setCartItems] = useState([]);
  
  const [username, setUsername] = useState();
  const [userid, setUserId] = useState();

  const [jwt, setJWT] = useState("");

  const hash = match.params.hash;
  const quantity = 1;

  console.log("Debug: Cart: ", cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  //////////////////////////////* SyncTree API & Redis setup *//////////////////////////////

  // SyncTree API: Get Token
  async function getToken() {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/cfsc/token",
        { hash_userid: hash },
        config
      );
      console.log(data);
      setJWT(data.access_token);
      setUsername(data.username);
      setUserId(data.userid);
    } catch (error) {
      console.log(error.message, ": ", error.response.data.message);
      setJWT("Invalid");
    }
  }

  // SyncTree API: Get Cart (Redis)
  async function getCart(getState) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      };
      const { data } = await axios.post("/cfsc/getcart", {}, config);

      setCartItems((prev) => (prev = data.cartItems));

      localStorage.setItem('cartItems', JSON.stringify(getState().cartItems)); // try try
      
    } catch (error) {
      console.log(error.message);
    }
  }

  // SyncTree API: addToCart (Redis)
  async function addToCart(getState) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: jwt,
        },
      };
      const { data } = await axios.post(
        "/cfsc/addtocart",
        { addToCart: [{ product: product, quantity: quantity }] },
        config
      );

      setCartItems((prev) => (prev = data.cartItems));

      localStorage.setItem('cartItems', JSON.stringify(getState().cartItems)); // try try

    } catch (error) {
      console.log(error.message); // Scenario: product not in Database
    }
  }

  // SyncTree API: Remove From Cart (Redis)
  async function removeFromCart(product, quantity) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      };
      const { data } = await axios.post(
        "/cfsc/removefromcart",
        { removeFromCart: [{ product: product, quantity: quantity }] },
        config
      );

      setCartItems((prev) => (prev = data.cartItems));

    } catch (error) {
      console.log(error.message);
    }
  }

  //////////////////////////////* End of SyncTree API & Redis setup *//////////////////////////////

  //////////////////////////////* useEffect *//////////////////////////////

  //  Get Token (when user reload page)
  useEffect(() => {
    getToken();
  }, []);

  // Get Cart (when token is valid)
  useEffect(() => {
    if (jwt !== "" && jwt !== "Invalid") {
      getCart();
      console.log("Order Page: Get Cart");
    }
  }, [jwt]);

  // addToCart
  useEffect(() => {
    if (product !== "") {
      addToCart();
      console.log("Added to Cart");
    }
  }, [product]);

  //////////////////////////////* End of useEffect *//////////////////////////////

  //////////////////////////////* Handler *//////////////////////////////

  // Handler: Cart Confirmation, when user confirm their cart
  const confirmationHandler = () => {
    history.push(`/confirmation/${hash}`);
  };

  //////////////////////////////* End of Handler *//////////////////////////////

  return (
    <>
      {jwt === "Invalid" ? (
        <Alert className="my-3" variant="danger">
          <Row>
            <Col className="my-3 d-flex flex-row">
              <h3 style={{ color: "white" }}>
                <strong>用户未登入或用户不存在</strong>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-row">
              <Link to="/">
                <Button type="button" className="btn-secondary">
                  返回主頁
                </Button>
              </Link>
            </Col>
          </Row>
        </Alert>
      ) : (
        <Container>
          <h3 className="my-3">{username}的下單頁面</h3>
          {product === "" ? (
            <>
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (!!result) {
                    setProduct((prev) => (prev = result?.text));
                  }
                  if (!!error) {
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
                        onClick={() =>
                          removeFromCart(item.product, item.quantity)
                        }
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
            className="mb-3 btn-outline-success"
            disabled={cartItems.length === 0}
            type="button"
          >
            確認下單
          </Button>
        </Container>
      )}
    </>
  );
}

export default RedisOrderScannerscreen;
