import { Card, Container, Col, Row } from "react-bootstrap";

function aboutUS() {
    return (
        <Container>
            <Row>
                <Col className="sm" xs={12}>
                    <Card>
                        <Card.Body>
                        <Card.Title as="h1">掃描二維碼</Card.Title>
                            </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)
}

export default aboutUS;