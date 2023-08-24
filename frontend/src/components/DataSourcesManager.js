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

export default function DataSourcesManager() {
  const dispatch = useDispatch();
  const { loading, error, aiInfo } = useSelector((state) => state.aiInfo || {});
  const userId = useSelector((state) => state.user?.userInfo?.id);

  useEffect(() => {
    // Fetch data sources when component mounts
    dispatch(fetchDataSources(userId));
  }, [dispatch, userId]);

  return (
    <Box>
      {/* TODO: Add pagination: https://mui.com/material-ui/react-table/#custom-pagination-options */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>Namespace</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Display data sources if they exist */}
            {aiInfo && aiInfo.data_sources ? (
              aiInfo.data_sources.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.file_name}</TableCell>
                  <TableCell>{row.namespace}</TableCell>
                  <TableCell>{translateToUserFriendlyDate(row.last_modified)}</TableCell>
                  <TableCell>
                    <DeleteModal id={row.id} />
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
