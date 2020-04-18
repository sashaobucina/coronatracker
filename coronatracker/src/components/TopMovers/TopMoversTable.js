import React, { useState } from "react";
import { Paper, Table, TableHead, TableBody, TableRow, TableContainer, TablePagination, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { StyledTableCell, StyledTableSortLabel } from "./CustomComponents";
import TableToolbar from "./TableToolbar";
import {
  getComparator,
  stableSort
} from "../../helpers/sorting";

const useStyles = makeStyles({
  paper: {
    background: '#373B52',
    color: '#3BBA9C'
  },
  pagination: {
    color: '#3BBA9C'
  }
});

function createRows(rows) {
  return rows.map((row, index) => {
    let { country, change, percent, total } = row;
    index += 1;
    change = `+${change}`;
    percent = `${percent.toFixed(3)}%`;
    return { index, country, change, percent, total };
  })
}

const headCells = [
  { id: "index", align: false, label: "#", sort: false },
  { id: "country", align: false, label: "Country", sort: false },
  { id: "percent", align: true, label: "Percent Change (%)", sort: true },
  { id: "change", align: true, label: "Change", sort: true },
  { id: "total", align: true, label: "Total Cases", sort: true }
];

export default function TopMoversTable(props) {
  const [ orderBy, setOrderBy ] = useState('percent');
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const { dense, order, rows, report, title, up } = props;

  const classes = useStyles();

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => (_) => {
    setOrderBy(property);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Paper className={classes.paper}>
      <TableToolbar title={title} report={report} up={up} />
      <TableContainer>
        <Table size={dense ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <StyledTableCell
                  id={headCell.id}
                  key={headCell.id}
                  align={headCell.align ? "right" : "left"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.sort
                    ?
                      (<Tooltip title="Sort by" placement="top">
                        <StyledTableSortLabel
                          active={orderBy === headCell.id}
                          direction={order}
                          onClick={handleSort(headCell.id)}
                        >
                          { headCell.label }
                        </StyledTableSortLabel>
                      </Tooltip>)
                    : headCell.label
                  }
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {createRows(stableSort(rows, getComparator(order, orderBy)))
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