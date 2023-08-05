import React from "react";
import { Container } from "react-bootstrap";
import ConfigureDataSourcesModal from "../components/ConfigureDataSourcesModal";

export default function Dashboard() {
  return (
    <Container>
      <h1>Dashboard</h1>
      <ConfigureDataSourcesModal />
    </Container>
  );
}
