import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";

import { register } from "../actions/userActions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.userLogin) || {};
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(email, password));
  };

  return (
    <Container>
      {/* TODO: Add custom error and loader components */}
      {error && <h1>{error}</h1>}
      {loading && <h1>Loading...</h1>}
      <Row>
        <Col md="4">
          <h1>Sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
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

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" color="primary" onClick={handleSubmit}>
              Sign up
            </Button>
          </Form>
          <p className="mt-2">
            Already have account? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
