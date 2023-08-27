import { Box, Button, Container } from "@mui/material";
import React from "react";
import ConfigureDataSourcesModal from "../components/ConfigureDataSourcesModal";
import DataSourcesManager from "../components/DataSourcesManager";
import { Link, useParams } from "react-router-dom";
import ChatbotSettings from "../components/ChatbotSettings";
import { useSelector } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function ChatbotConfigDetail() {
  let { botId } = useParams();
  botId = parseInt(botId);
  const bot = useSelector((state) => state.aiInfo?.bots?.find((bot) => bot.id === botId));

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="text" LinkComponent={Link} to="/dashboard" startIcon={<ArrowBackIosNewIcon />}>
          Chatbots
        </Button>
      </Box>
      {bot && (
        <>
          <ConfigureDataSourcesModal botId={bot.id} namespace={bot.namespace} />
          <DataSourcesManager botId={bot.id} namespace={bot.namespace} />
          <ChatbotSettings botId={bot.id} />
        </>
      )}
    </Container>
  );
}
