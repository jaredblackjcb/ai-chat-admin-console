import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import { encodeFiles } from "../actions/aiActions";

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

export default function ConfigureDataSourcesModal() {
  const [open, setOpen] = React.useState(false);
  const [namespace, setNamespace] = React.useState("");
  const [dense, setDense] = React.useState(true);
  const [secondary, setSecondary] = React.useState(false);
  const [fileNames, setFileNames] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const { loading, error } = useSelector((state) => state.aiInfo || {});
  const userId = useSelector((state) => state.user.userInfo.user_id);

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNamespaceChange = (event) => {
    setNamespace(event.target.value);
  };
  const handleFileChange = (event) => {
    // Get a list of files and file names
    const uploadedFiles = event.target.files;
    const names = Array.from(uploadedFiles).map((file) => file.name);

    setFiles([...files, ...uploadedFiles]);
    setFileNames([...fileNames, ...names]);
  };
  function handleDeleteFile(index) {
    const updatedFileNames = fileNames.filter((_, i) => i !== index);
    setFileNames(updatedFileNames);

    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  }
  const handleSave = (event) => {
    event.preventDefault();
    // Add the files to a formData object
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    // Send files to backend to upload vectors to pinecone (include userId + namespace and vectors)
    dispatch(encodeFiles(formData, namespace, userId));
    handleClose();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Configure Data Sources
      </Button>
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

          {/* Namespace selector */}
          <Button>Add Namespace +</Button>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">namespace</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={namespace}
              label="Namespace"
              onChange={handleNamespaceChange}
            >
              <MenuItem value={"test7"}>test7</MenuItem>
              <MenuItem value={"test8"}>test8</MenuItem>
              <MenuItem value={"test9"}>test9</MenuItem>
            </Select>
          </FormControl>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Saving will add the uploaded data to the information used by your chatbot configured with the same
            namespace.
          </Typography>

          <Button variant="contained" onClick={handleSave}>
            SAVE
          </Button>
          {error && <h1>{error}</h1>}
          {loading && <h1>Loading...</h1>}
        </Box>
      </Modal>
    </Box>
  );
}
