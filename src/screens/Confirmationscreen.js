import axios from "axios";
import { Container, Button, Card, Table, ListGroup, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Confirmationscreen({ match, history }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();

  const [jwt, setJWT] = useState("");

  const user = match.params.user;
  const hash = match.params.hash;

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
  async function getCart() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      };
      const { data } = await axios.post("/cfsc/getcart", {}, config);

      console.log("Loading:", loading);
      setCartItems((prev) => (prev = data.cartItems));
      setLoading((prev) => (prev = false));
      console.log("Loading:", loading);
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

  // Get Cart (load once)
  useEffect(() => {
    getCart();
    console.log("Confirmation Page: Get Cart");
  }, [jwt]);

  console.log(cartItems);

  //////////////////////////////* End of useEffect*//////////////////////////////

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <Card className="my-3 p-3 rounded ">
        <Card.Title>
          <h2>訂單總結</h2>
        </Card.Title>

        <Card.Text>訂單編號：</Card.Text>

        {loading == true ? (
          <Container className="my-3" style={{width: "360px"}}>
            <Loader />
          </Container>
        ) : (
          <Container>
            <Table bordered>
              <thead className="table-active">
                <tr>
                  <th style={{ width: 120 }}>產品</th>
                  <th style={{ width: 120 }}>數量</th>
                  <th style={{ width: 120 }}>價格</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={cartItems.indexOf(item, 0)}>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>$10.99</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Table style={{"borderTopWidth":"1px", "borderTopColor":"#aaaaaa", "borderTopStyle":"solid"}}>
              <tbody>
                <tr key="discount">
                  <td style={{ width: 240, color: "#5b62f4" }}><strong>折扣</strong></td>
                  <td style={{ width: 120, color: "#5b62f4" }}>100%</td>
                </tr>
                <tr key="total_price">
                  <td style={{ width: 240, color: "#5b62f4" }}><strong>總計</strong></td>
                  <td style={{ width: 120, color: "#5b62f4" }}>$0</td>
                </tr>
              </tbody>
            </Table>
          </Container>

        )}

        <Link to={`/`} style={{ textDecoration: "none" }} xs={12}>
          <Button type="button" className="w-100 btn-secondary">
            返回主頁
          </Button>
        </Link>
      </Card>
    </Container>
  );
}

export default Confirmationscreen;
