// used in Homescreen.js
import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Nav } from "react-bootstrap";
import { QrReader } from "react-qr-reader";
import { Link } from "react-router-dom";
import axios from "axios";

function UserScannerscreen() {
  const [user, setUser] = useState("NotLoggedIn");

  // SyncTree API: userverification
  async function getUser() {
    const { data } = await axios.post("/cfsc/userverification", {
      username: `${user}`,
    });
    console.log("SyncTree POST Success");
  }

  return (
    <>
      {user !== "NotLoggedIn" ? (
        <Container>
          <Alert className="my-3 text-center" variant="secondary">
            {user}，你好，請按「<strong>下單</strong>」瀏覽下單頁面
          </Alert>

          <div className="text-center my-3" xs={12}>
            <Link to={`/${user}/order`} style={{ textDecoration: "none" }}>
              <Button className="w-100" variant="outline-primary" size="md">
                下單
              </Button>
            </Link>
          </div>
        </Container>
      ) : (
        <>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (!!result) {
                try {
                  getUser();
                  setUser(result?.text);
                  console.log("Triggered Try");
                } catch (AxiosError) {
                  <Alert>用户不存在</Alert>;
                }
              }

              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: "100%" }}
          />

          <h1 className="my-3 text-center">請對準登入二維碼</h1>
        </>
      )}
    </>
  );
}

export default UserScannerscreen;
