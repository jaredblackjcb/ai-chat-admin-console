import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { fetchDataSources } from "../actions/aiActions";

export default function DataSourcesManager() {
  const dispatch = useDispatch();
  const { loading, error, aiInfo } = useSelector((state) => state.aiInfo || {});
  const userId = useSelector((state) => state.user.userInfo.user_id);

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
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aiInfo && aiInfo.data_sources ? (
              aiInfo.data_sources.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.file_name}</TableCell>
                  <TableCell>{row.namespace}</TableCell>
                  <TableCell>{row.last_modified}</TableCell>
                  <TableCell>
                    <Button>Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
