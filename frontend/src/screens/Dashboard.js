import React from "react";
import { Container } from "react-bootstrap";
import ConfigureDataSourcesModal from "../components/ConfigureDataSourcesModal";
import DataSourcesManager from "../components/DataSourcesManager";

export default function Dashboard() {
  return (
    <Container>
      <h1>Dashboard</h1>
      <ConfigureDataSourcesModal />
      <DataSourcesManager />
    </Container>
  );
}
