// used in Homescreen.js
import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomeCard() {
  return (
    <Container>
      <Row>
        <Col className="sm">
          <Card className="my-3 p-3 rounded text-center">
            <Link to={`/userscanner`}>
              <Card.Img className="" src="/images/qr-code-gif.gif" />
            </Link>

            <Card.Body>
              <Link to={`/userscanner`} style={{ textDecoration: "none" }}>
                <Card.Title as="h1">掃描二維碼</Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col className="xs" xs={6}>
          <Card className="my-3 p-3 rounded text-center">
            <Card.Body>
              <Card.Title as="h1">語音導航</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="xs" xs={6}>
          <Card className="my-3 p-3 rounded text-center">
            <Card.Body>
              <Card.Title as="h1">電話查詢</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeCard;
