import React, { useState } from "react";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector, useDispatch } from "react-redux";

import { createBot, fetchBots } from "../actions/aiActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateBotModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { loading, error } = useSelector((state) => state.aiInfo || {});
  const userId = useSelector((state) => state.user?.userInfo?.id);

  // Open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    try {
      await dispatch(createBot(userId, title));
      await dispatch(fetchBots(userId));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Grid item>
          <Typography variant="h4">Chatbots</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleOpen}>
            <AddIcon sx={{ mr: 1 }} />
            CREATE CHATBOT
          </Button>
        </Grid>
      </Grid>
      {/* Create a modal with a text input of Title */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-create-chatbot"
        aria-describedby="modal-create-a-new-chatbot"
      >
        {/* Create Bot Form */}
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Typography id="chatbot-modal-title" variant="h6" component="h2">
            Create a New Chatbot
          </Typography>
          <TextField margin="normal" required fullWidth name="title" label="Title" type="text" id="title" autoFocus />
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{ marginRight: 2 }}
          >
            Save
          </LoadingButton>
          <Button variant="outlined" disabled={loading} onClick={handleClose}>
            CANCEL
          </Button>
          {error && <h1>{error}</h1>}
        </Box>
      </Modal>
    </Box>
  );
}
