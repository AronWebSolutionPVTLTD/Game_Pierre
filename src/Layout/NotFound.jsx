import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <h1>404 - Not Found</h1>
          <p>Sorry, the page you are looking for might be in another castle.</p>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Go to Login Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
