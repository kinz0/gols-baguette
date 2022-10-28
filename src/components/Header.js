// used in App.js
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav.Link href="/">
            <Navbar.Brand>Baguette</Navbar.Brand>
          </Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">主頁</Nav.Link>
              <Nav.Link href="/about">關於我們</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
