import { Container } from "@mui/material";
import React from "react";
import ConfigureDataSourcesModal from "../components/ConfigureDataSourcesModal";
import DataSourcesManager from "../components/DataSourcesManager";
import { useParams } from "react-router-dom";
import ChatbotSettings from "../components/ChatbotSettings";

export default function ChatbotConfigDetail() {
  const { namespace } = useParams();
  return (
    <Container>
      <h1>Configure Chatbot</h1>
      <ConfigureDataSourcesModal namespace={namespace} />
      <DataSourcesManager namespace={namespace} />
      <ChatbotSettings namespace={namespace} />
    </Container>
  );
}
