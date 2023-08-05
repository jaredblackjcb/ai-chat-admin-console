import React from "react";
import { Container, Row, Col, ToggleButton, ToggleButtonGroup, Table } from "react-bootstrap";
import PricingCard from "../components/PricingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckoutForm from "../components/CheckoutForm";


export default function Pricing() {

  return (
    <Container className="py-5 text-center mx-auto">
      <h1>Simple, clear pricing</h1>
      <h4>Get started with the best plan for you.</h4>

      <ToggleButtonGroup name="priceToggle" type="radio">
        <ToggleButton id="tbg-btn-1" value={1}>
          Annual
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value={2}>
          Monthly
        </ToggleButton>
      </ToggleButtonGroup>

      <Row className="py-5">
        <Col lg={4}>
          <PricingCard />
        </Col>
        <Col lg={4}>
          <PricingCard />
        </Col>
        <Col lg={4}>
          <PricingCard />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={8} md={10} sm={12}>
          <Table striped>
            <thead>
              <tr>
                <th style={{ width: "34%" }}></th>
                <th style={{ width: "22%" }}>Free</th>
                <th style={{ width: "22%" }}>Pro</th>
                <th style={{ width: "22%" }}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-start">Feature 1</th>
                <td>
                  <FontAwesomeIcon icon="fa-check" />
                </td>
                <td>
                  <FontAwesomeIcon icon="fa-check" />
                </td>
                <td>
                  <FontAwesomeIcon icon="fa-check" />
                </td>
              </tr>

              <tr>
                <th className="text-start">Feature 2</th>
                <td>
                  <FontAwesomeIcon icon="fa-check" />
                </td>
                <td>
                  <FontAwesomeIcon icon="fa-check" />
                </td>
                <td>
                  <FontAwesomeIcon icon="fa-check" />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

        <CheckoutForm />
    </Container>
  );
}
