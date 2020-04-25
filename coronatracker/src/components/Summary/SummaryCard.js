import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { StyledTableCell } from "../Shared/CustomComponents";
import { formatNumber } from "../../helpers/conversions";

const useStyle = makeStyles({
  root: {
    background: "#373B52",
    color: "#3BBA9C"
  },
  header: {
    backgroundImage: `url(${require("../../static/coronavirus.jpg")})`,
    color: "#2E3047"
  },
});

export default function SummaryCard(props) {
  const { buttonComponent, data, size, subheader } = props;
  const { confirmed, deaths } = data;
  const { country } = confirmed;

  const classes = useStyle();

  const idFn = (x) => x;
  const percentFn = (x) => `${formatNumber(x)}%`;
  const indicatorFn = (x) => `+${formatNumber(x)}`;

  const getRow = (title, key, formatFn) => (
    <TableRow>
      <StyledTableCell style={{ fontWeight: "bold" }}>
        {title}
      </StyledTableCell>
      <StyledTableCell>
        {formatFn(confirmed[key])}
      </StyledTableCell>
      <StyledTableCell>
        {formatFn(deaths[key])}
      </StyledTableCell>
    </TableRow>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title={country}
        subheader={subheader}
      />
      <CardContent>
        <TableContainer>
          <Table size={size}>
            <TableHead>
              <TableRow>
                <StyledTableCell id="empty" />
                <StyledTableCell
                  id="confirmed"
                  style={{ color: "#DB7C00" }}
                >
                  Confirmed
                </StyledTableCell>
                <StyledTableCell
                  id="deaths"
                  style={{ color: "#F44336" }}
                >
                  Deaths
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getRow("Total Cases", "total", indicatorFn)}
              {getRow("New Cases", "newCases", indicatorFn)}
              {getRow("Percent Change", "percentChange", percentFn)}
              {getRow("Max # of Cases", "maxCases", idFn)}
              {getRow("Days Since Peak", "daysSince", idFn)}
              {getRow("Percent Below Peak", "percentBelow", percentFn)}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        {buttonComponent ? buttonComponent : null }
      </CardActions>
    </Card>
  );
}