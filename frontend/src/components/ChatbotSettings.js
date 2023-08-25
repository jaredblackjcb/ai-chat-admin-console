import { Button, Checkbox, Container, FormControlLabel, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export default function ChatbotSettings() {
  return (
    <Container>
      <Paper sx={{ padding: 3, mt: 2, mb: 2 }} elevation={3}>
        <Typography variant="h5">Settings</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Display link to source file in chat responses"
            />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <Button variant="contained" color="primary">
          SAVE
        </Button>
      </Paper>
    </Container>
  );
}
