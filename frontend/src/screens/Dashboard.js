import React from "react";
import Container from "@mui/material/Container";
import ConfigureDataSourcesModal from "../components/ConfigureDataSourcesModal";
import DataSourcesManager from "../components/DataSourcesManager";
import TopicCard from "../components/TopicCard";

export default function Dashboard() {
  return (
    <Container>
      <h1>Dashboard</h1>
      <TopicCard
        topicName="Test Chatbot"
        namespace={"test10"}
        url="https://www.mychatbots.com/testuser/test-topic-id"
        totalRequests={281}
        storageTokensUsed={72}
      />
    </Container>
  );
}
