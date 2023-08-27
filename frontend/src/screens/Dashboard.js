import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import ConfigureDataSourcesModal from "../components/ConfigureDataSourcesModal";
import DataSourcesManager from "../components/DataSourcesManager";
import BotCard from "../components/BotCard";

import CreateBotModal from "../components/CreateBotModal";
import { useDispatch, useSelector } from "react-redux";

import { fetchBots } from "../actions/aiActions";

export default function Dashboard() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.userInfo?.id || {});
  const { loading, error, bots } = useSelector((state) => state.aiInfo || {});

  useEffect(() => {
    dispatch(fetchBots(userId));
  }, [dispatch, userId]);

  return (
    <Container>
      <CreateBotModal />
      {bots &&
        bots.map((bot) => (
          <BotCard
            botId={bot.id}
            topicName={bot.title}
            namespace={bot.namespace}
            url="https://www.mychatbots.com/testuser/test-topic-id"
            totalRequests={bot.total_requests}
            storageTokensUsed={bot.storage_space_used}
          />
        ))}
    </Container>
  );
}
