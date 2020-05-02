import React, { useState } from "react";
import values from "lodash/values";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TablePagination,
  Tooltip
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import TableToolbar from "../Shared/TableToolbar";
import { StyledTableSortLabel } from "../Shared/CustomComponents";
import { daysSinceScale, percentBelowScale } from "./scales";
import { stableSort } from "../../helpers/sorting";
import { today } from "../../helpers/misc";
import { formatNumber } from "../../helpers/conversions";

const useStyle = makeStyles({
  paper: {
    background: '#373B52',
    color: '#3BBA9C'
  },
  pagination: {
    color: '#3BBA9C'
  }
});

const headCells = [
  { id: "country", align: false, label: "Country", sort: false },
  { id: "newCases", align: true, label: "New Cases", sort: true },
  { id: "peak", align: true, label: "Peak", sort: true },
  { id: "daysSince", align: true, label: "Days Since", sort: true },
  { id: "percentBelow", align: true, label: "% Below Peak", sort: true },
  { id: "peakDate", align: true, label: "Date of Peak", sort: false }
];

export const StyledTableCell = withStyles(() => ({
  head: {
    background: '#373b52',
    borderBottom: "2px solid #3BBA9C",
    color: '#3BBA9C',
    fontSize: 16,
    fontWeight: "bolder"
  },
  body: {
    background: '#3C3F58',
    borderBottom: "1px solid #3BBA9C",
    color: '#3BBA9C',
    fontSize: 15
  }
}))(TableCell);


const generateStyle = (value, scale) => ({
  backgroundColor: "#3C3F58",
  borderBottom: "1px solid #3BBA9C",
  color: scale(value),
  fontSize: 15
});

export default function PeakTable(props) {
  const [ order, setOrder ] = useState("desc");
  const [ orderBy, setOrderBy ] = useState('daysSince');
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(20);
  const { dense, rows, title } = props;

  const classes = useStyle();
  const padding = dense ? "checkbox" : "default";

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  return (
    <Paper className={classes.paper}>
      <TableToolbar
        columns={headCells.map(({ label }) => label)}
        filename={`peak_data_${today()}.csv`}
        rows={rows.map(row => values(row))}
        title={title}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <StyledTableCell
                  id={headCell.id}
                  key={headCell.id}
                  padding={padding}
                  align={headCell.align ? "right" : "left"}
                >
                  {headCell.sort
                    ?
                      (<Tooltip title="Sort by" placement="top">
                        <StyledTableSortLabel
                          active={orderBy === headCell.id}
                          direction={order}
                          onClick={handleRequestSort(headCell.id)}
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
            {stableSort(rows, order, orderBy)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.country}>
                  <StyledTableCell padding={padding}>
                    {row.country}
                  </StyledTableCell>
                  <StyledTableCell align="right" padding={padding}>
                    {row.newCases >= 0 ? `+${formatNumber(row.newCases)}` : formatNumber(row.newCases)}
                  </StyledTableCell>
                  <StyledTableCell align="right" padding={padding}>
                    {formatNumber(row.peak)}
                  </StyledTableCell>
                  <TableCell
                    align="right"
                    padding={padding}
                    style={generateStyle(row.daysSince, daysSinceScale)}
                  >
                    {row.daysSince}
                  </TableCell>
                  <TableCell
                    align="right"
                    padding={padding}
                    style={generateStyle(row.percentBelow, percentBelowScale)}
                  >
                    {`${row.percentBelow}%`}
                  </TableCell>
                  <StyledTableCell align="right" padding={padding}>
                    {row.peakDate}
                  </StyledTableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10, 20, rows.length]}
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