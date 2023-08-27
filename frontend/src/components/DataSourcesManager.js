import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { fetchDataSources } from "../actions/aiActions";
import DeleteModal from "./DeleteModal";
import { translateToUserFriendlyDate } from "../utils";

export default function DataSourcesManager({ botId, namespace }) {
  const dispatch = useDispatch();
  const { loading, error, dataSources } = useSelector((state) => state.aiInfo || {});

  useEffect(() => {
    // Fetch data sources when component mounts
    dispatch(fetchDataSources(botId));
  }, [dispatch, botId]);

  return (
    <Box>
      {/* TODO: Add pagination: https://mui.com/material-ui/react-table/#custom-pagination-options */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Display data sources associated with the given namespace if they exist */}
            {dataSources && dataSources.files ? (
              dataSources.files.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.file_name}</TableCell>
                  <TableCell>{translateToUserFriendlyDate(row.last_modified)}</TableCell>
                  <TableCell>
                    <DeleteModal botId={botId} namespace={namespace} dataSourceId={row.id} fileName={row.file_name} />
                  </TableCell>
                </TableRow>
              ))
            ) : // Display the loading component while waiting for data to load
            loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
        {error && <h1>{error}</h1>}
      </TableContainer>
    </Box>
  );
}
