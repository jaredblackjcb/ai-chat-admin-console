import { Box, Button, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataSource } from "../actions/aiActions";

export default function DeleteModal({ id }) {
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

  const dataSource = useSelector((state) => {
    if (state.aiInfo && state.aiInfo.aiInfo.data_sources) {
      console.log(state.aiInfo.aiInfo.data_sources.filter((dataSource) => dataSource.id === id));
      return state.aiInfo.aiInfo.data_sources.filter((dataSource) => dataSource.id === id)[0];
    } else {
      return []; // Return an empty array or handle the absence of dataSources appropriately.
    }
  });
  // const userId = useSelector((state) => state.user?.userInfo.user_id || {});

  // const dataSource = useSelector((state) => state.aiInfo.dataSources.filter((dataSource) => dataSource.id === id));
  // Define actions for dispatching the delete event
  const handleDelete = async (event) => {
    event.preventDefault();
    dispatch(deleteDataSource(id, dataSource.user, dataSource.file_name, dataSource.namespace));
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Delete</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="delete-modal" aria-describedby="delete-data-source">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete {dataSource.file_name}? The contents of this file will no longer be available to reference in your
            chatbot.
          </Typography>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          {error && <h1>{error}</h1>}
          {loading && <h1>Loading...</h1>}
        </Box>
      </Modal>
    </Box>
  );
}
