import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";

export default function Signup() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: state.email,
      password: state.password,
    };
    console.log("Sign up " + userData.email + " " + userData.password);
  };

  return (
    <Container>
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
                value={state.email}
                onChange={handleChange}
              />
              <FormControl.Feedback type="invalid"></FormControl.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={state.password}
                onChange={handleChange}
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
