import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import { encodeFiles, fetchDataSources } from "../actions/aiActions";
import { Grid } from "@mui/material";

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

export default function ConfigureDataSourcesModal({ botId, namespace }) {
  const [open, setOpen] = useState(false);
  const [dense, setDense] = useState(true);
  // List of file names
  const [fileNames, setFileNames] = useState([]);
  // List of file objects
  const [files, setFiles] = useState([]);
  const { loading, error } = useSelector((state) => state.aiInfo || {});
  const userId = useSelector((state) => state.user?.userInfo?.id);

  const dispatch = useDispatch();

  // Open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFileNames([]);
    setFiles([]);
    setOpen(false);
  };

  // Update the list of files and file names when a file is uploaded
  const handleFileChange = (event) => {
    // Get a list of files and file names
    const uploadedFiles = event.target.files;
    const names = Array.from(uploadedFiles).map((file) => file.name);
    setFiles([...files, ...uploadedFiles]);
    setFileNames([...fileNames, ...names]);
  };

  // Update the list of files and file names when a file is uploaded
  function handleDeleteFile(index) {
    const updatedFileNames = fileNames.filter((_, i) => i !== index);
    setFileNames(updatedFileNames);
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  }

  // Send the files to the backend to be uploaded to Amazon s3 and Pinecone
  const handleSave = async (event) => {
    event.preventDefault();
    // Add the files to a formData object
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    try {
      await dispatch(encodeFiles(formData, namespace, botId));
      dispatch(fetchDataSources(botId));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Grid item>
          <Typography variant="h4">Configure Test Chatbot</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleOpen}>
            <FileUploadIcon sx={{ mr: 1 }} />
            UPLOAD FILES
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-configure-data-sources"
        aria-describedby="modal-upload-files-for-chat-sources"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Configure Data Source
          </Typography>

          {/* File upload input */}
          <Button variant="outlined" component="label">
            <FileUploadIcon sx={{ mr: 1 }} />
            UPLOAD FILES
            <input type="file" multiple accept=".pdf, .txt" hidden onChange={handleFileChange} />
          </Button>

          {/* List of uploaded files */}
          <List dense={dense}>
            {fileNames.map((fileName, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFile(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                {/* Display the file names */}
                <ListItemText primary={fileName} />
              </ListItem>
            ))}
          </List>

          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Saving will add the uploaded data to the information used by your chatbot configured with the same
            namespace.
          </Typography>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleSave}
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
