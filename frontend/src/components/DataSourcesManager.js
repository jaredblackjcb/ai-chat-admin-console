import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DataSourcesManager() {
  // Table version
  function createTableRow(id, fileName, namespace, lastModified) {
    return { id, fileName, namespace, lastModified };
  }

  // Get data sources data for user
  const rows = [
    createTableRow(1, "testfilename.pdf", "testnamespace", "testlastmodifiedDate"),
    createTableRow(2, "testfilename.pdf", "testnamespace", "testlastmodifiedDate"),
    createTableRow(3, "testfilename.pdf", "testnamespace", "testlastmodifiedDate"),
    createTableRow(4, "testfilename.pdf", "testnamespace", "testlastmodifiedDate"),
  ];

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
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.fileName}</TableCell>
                <TableCell>{row.namespace}</TableCell>
                <TableCell>{row.lastModified}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
