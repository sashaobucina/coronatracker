import React, { useState } from "react";
import { Paper, Table, TableHead, TableBody, TableRow, TableContainer, TablePagination } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { StyledTableCell } from "./CustomComponents";
import TableToolbar from "./TableToolbar";

const useStyles = makeStyles({
  paper: {
    background: '#373B52',
    color: '#3BBA9C'
  },
  pagination: {
    color: '#3BBA9C'
  }
});

export default function TopMoversTable(props) {
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const { dense, rows, report, title } = props;

  const classes = useStyles();

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <TableToolbar title={title} up={true} report={report} />
        <TableContainer>
          <Table size={dense ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Country</StyledTableCell>
                <StyledTableCell align="right">Percent Change (%)</StyledTableCell>
                <StyledTableCell align="right">Change</StyledTableCell>
                <StyledTableCell align="right">Total Cases</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.country}>
                    <StyledTableCell>{row.index}</StyledTableCell>
                    <StyledTableCell>{row.country}</StyledTableCell>
                    <StyledTableCell align="right">{row.percent}</StyledTableCell>
                    <StyledTableCell align="right">{row.change}</StyledTableCell>
                    <StyledTableCell align="right">{row.total}</StyledTableCell>
                  </TableRow>
              ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <StyledTableCell colSpan={6} />
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
  );
}