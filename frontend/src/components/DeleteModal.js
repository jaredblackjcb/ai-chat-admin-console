import { Box, Button, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataSource, fetchDataSources } from "../actions/aiActions";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

export default function DeleteModal({ botId, namespace, dataSourceId, fileName }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.aiInfo || {});

  // Handle opening and closing modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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

  // Define actions for dispatching the delete event
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      // TODO: Change this to only use dataSourceId, get the other info from the backend
      await dispatch(deleteDataSource(dataSourceId, botId, fileName, namespace));
      await dispatch(fetchDataSources(botId));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Delete</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="delete-modal" aria-describedby="delete-data-source">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Delete {fileName}? The contents of this file will no longer be available to reference in your chatbot.
          </Typography>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="contained"
            onClick={handleDelete}
            sx={{ marginRight: 2 }}
          >
            DELETE
          </LoadingButton>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          {error && <h1>{error}</h1>}
        </Box>
      </Modal>
    </Box>
  );
}
