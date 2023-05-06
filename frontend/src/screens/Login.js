import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form, FormControl, Image, Card } from "react-bootstrap";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.userLogin) || {};

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container fluid>
      {/* TODO: Add custom error and loader components */}
      {error && <h1>{error}</h1>}
      {loading && <h1>Loading...</h1>}
      <Row>
        <Col xs={12} md={7} lg={5} xl={4} className="d-flex align-items-center justify-content-center">
          <Card className="card-plain mt-6">
            <Card.Header>
              <h3 className="text-center mb-2">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 input-group input-group-static" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormControl.Feedback type="invalid"></FormControl.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 input-group input-group-static" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" onClick={handleSubmit}>
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <p className="mt-2">
                Don't have account?{" "}
                <Link className="text-primary text-gradient font-weight-bold" to={"/signup"}>
                  Signup
                </Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
