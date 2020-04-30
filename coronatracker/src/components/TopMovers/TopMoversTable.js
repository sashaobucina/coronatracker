import React, { useState } from "react";
import union from "lodash/union";
import values from "lodash/values";
import { Paper, Table, TableHead, TableBody, TableRow, TableContainer, TablePagination, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { StyledTableCell, StyledTableSortLabel } from "../Shared/CustomComponents";
import TableToolbar from "../Shared/TableToolbar";
import { stableSort } from "../../helpers/sorting";
import { formatNumber } from "../../helpers/conversions";
import { today } from "../../helpers/misc";

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
  return rows.map(row => {
    let { index, country, change, percentChange, totalCases } = row;
    change = change >= 0 ? `+${formatNumber(change)}` : `${formatNumber(change)}`;
    percentChange = `${percentChange}%`;
    totalCases = formatNumber(totalCases);
    return { index, country, change, percentChange, totalCases };
  })
}

const headCells = [
  { id: "index", align: false, label: "#", sort: false },
  { id: "country", align: false, label: "Country", sort: false },
  { id: "percentChange", align: true, label: "Percent Change (%)", sort: true },
  { id: "change", align: true, label: "Change", sort: true },
  { id: "totalCases", align: true, label: "Total Cases", sort: true }
];

export default function TopMoversTable(props) {
  const [ orderBy, setOrderBy ] = useState('percentChange');
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const { dense, order, rows, report, title } = props;

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
      <TableToolbar
        columns={headCells.map(({ label }) => label)}
        filename={`top_movers_${report}_${today()}.csv`}
        rows={rows.map((row, i) => union([i+1], values(row)))}
        title={`${title} (# of ${report})`}
      />
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
            {createRows(stableSort(rows, order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row["country"]}>
                  <StyledTableCell>{row["index"]}</StyledTableCell>
                  <StyledTableCell>{row["country"]}</StyledTableCell>
                  <StyledTableCell align="right">{row["percentChange"]}</StyledTableCell>
                  <StyledTableCell align="right">{row["change"]}</StyledTableCell>
                  <StyledTableCell align="right">{row["totalCases"]}</StyledTableCell>
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