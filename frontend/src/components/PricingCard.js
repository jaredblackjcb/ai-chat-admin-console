import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function PricingCard() {
  return (
    <Card className="mb-5 mb-lg-0">
      <Card.Body>
        <Card.Title className="text-muted text-uppercase">Free</Card.Title>
        <Card.Subtitle>
          $0<span class="period">/month</span>
        </Card.Subtitle>
        <hr />
        <ul className="fa-ul">
          <li>
            <span className="fa-li">
              <FontAwesomeIcon icon="fa-check" />
            </span>
            Single User
          </li>
          <li>
            <span className="fa-li">
              <FontAwesomeIcon icon="fa-check" />
            </span>
            5GB Storage
          </li>
        </ul>
        <div className="d-grid">
          <Link to="/signup">
            <Button className="btn btn-primary text-uppercase">GET STARTED</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
