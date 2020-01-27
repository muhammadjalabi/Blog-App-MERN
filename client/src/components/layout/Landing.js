import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Landing = () => {
  return (
    <div>
      <Container
        style={{ height: "75vh" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        {" "}
        <Row className="mb-4">
          <p className="text-secondary h3"> Blogging Application</p>
        </Row>
        <Row>

        </Row>
      </Container>
    </div>
  )
}

export default Landing