// used in Homescreen.js
import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Nav } from "react-bootstrap";
import { QrReader } from "react-qr-reader";
import { Link } from "react-router-dom";
import axios from "axios";

function UserScannerscreen() {
  const [username, setUsername] = useState("");
  const [userid, setUserId] = useState("");
  const [hash, setHash] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // login
  useEffect(()=> {
    if (username !== "") {
      // SyncTree API: userverification
      async function login() {
        try {
          const { data } = await axios.post("/cfsc/login", {
            userid: `${userid}`,
            username: `${username}`,
          });
          // console.log(data.access_token);
          setIsLoggedIn(true);
          console.log("Logged In: ", isLoggedIn); 

        } catch (error) {
          console.log(error.message);
          console.log(isLoggedIn);
          setUsername ("");
          setUserId ("");
        }   
      }
      login();         
    }
  }, [userid, username, isLoggedIn]);

  return (
    <>
      {isLoggedIn === true ? (
        <Container>
          <Alert className="my-3 text-center" variant="secondary">
            {username}，你好！ <br></br>
            請按「<strong>下單</strong>」瀏覽下單頁面。
          </Alert>

          <div className="text-center my-3" xs={12}>
            <Link to={`/order/${hash}`} style={{ textDecoration: "none" }}>
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
                setUsername((prev) => (prev = JSON.parse(result).name));
                setUserId((prev) => (prev = JSON.parse(result).id));
                // Create a hashed userid
                var sha256 = require('js-sha256');
                var hash_id = sha256(btoa(JSON.parse(result).id));
                setHash((prev) => (prev = hash_id));              
              }
              if (!!error) {
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
