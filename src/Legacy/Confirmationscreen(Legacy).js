import axios from 'axios';
import { Container, Button, Card, Table } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Confirmationscreen({match, history}) {
  const [cartItems, setCartItems] = useState([]);
  const user = match.params.user

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

    // Get Cart (load once)
    useEffect(() => {
      getCart();
      console.log("Confirmation Page: Get Cart");
    }, []);

    console.log(cartItems)

  return (
      <Container style={{display:'flex', alignItems: 'center', justifyContent: 'center', height:'50vh'}}>
        <Card className="my-3 p-3 rounded ">
          <Card.Title><h2>訂單總結</h2></Card.Title>

          <Card.Text>訂單編號：</Card.Text>

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

          <Link to={`/`} style={{ textDecoration: "none" }} xs={12}>
            <Button type="button" className="w-100 btn-secondary">
              返回主頁
            </Button>
          </Link>
          
        </Card>   
      </Container>
  )

}

export default Confirmationscreen
