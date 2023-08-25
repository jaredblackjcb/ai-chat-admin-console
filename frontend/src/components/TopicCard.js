// Create a react functional component that uses mui components and accepts props of topic and displays a card with the topic name, usage stats, url, and storage tokens used
import { Container, Grid, Link as MuiLink, Paper, Typography } from "@mui/material";
import React from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";
import { Link } from "react-router-dom";

export default function TopicCard({ topicName, namespace, url, totalRequests, storageTokensUsed }) {
  return (
    <Container>
      <Paper sx={{ padding: 3, mt: 2, mb: 2 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant={"h6"}>
              <Link to={`/chatbot/configure/${namespace}`}>{topicName}</Link>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <MuiLink href={url}>{url}</MuiLink>
            <CopyToClipboardButton text={url} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
