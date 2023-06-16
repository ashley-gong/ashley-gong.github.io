import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function MyStuff() {
  return (
    <div>
      <Box margin={{ xs: "50px 50px 50px 50px", lg: "50px 150px 150px 150px" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Work</TableCell>
                <TableCell>Calories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default MyStuff;
