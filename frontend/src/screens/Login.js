import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, userInfo } = useSelector((state) => state.userLogin) || {};
  const { pathname } = location.state?.from || "/dashboard";

  useEffect(() => {
    console.log("Redirect useEffect called");
    console.log("location.state.from: " + location.state?.from);
    console.log("pathname: " + pathname);
    if (userInfo) {
      console.log("Redirect useEffect userInfo: " + userInfo);
      navigate(pathname);
    }
  }, [navigate, pathname, location.state?.from, userInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container>
      {/* TODO: Add custom error and loader components */}
      {error && <h1>{error}</h1>}
      {loading && <h1>Loading...</h1>}
      <Row>
        <Col md="4">
          <h1>Login</h1>
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
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" color="primary" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
          <p className="mt-2">
            Don't have account? <Link to={"/signup"}>Signup</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
