import React from "react";
import get from "lodash/get";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography
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
    backgroundSize: "cover",
    color: "#2E3047"
  },
  grid: {
    paddingTop: 10
  },
  recoveredText: {
    color: "#478C30"
  },
  deathsText: {
    color: "#F44336"
  }
});

export default function SummaryCard(props) {
  const { buttonComponent, data, size, subheader } = props;
  const { confirmed, deaths, recovered } = data;
  const { country } = confirmed;

  const classes = useStyle();

  // create format functions for table rows
  const idFn = (x) => x;
  const formatFn = (x) => formatNumber(x);
  const percentFn = (x) => `${formatNumber(x)}%`;
  const indicatorFn = (x) => x >= 0 ? `+${formatNumber(x)}` : `${formatNumber(x)}`;

  // calculate mortality and recovery rates
  const confirmedTotal = get(confirmed, "total", 0);
  const deathsTotal = get(deaths, "total", 0);
  const mortalityRate = confirmedTotal !== 0 ? ((deathsTotal / confirmedTotal) * 100).toFixed(2) : 0;
  const recoveryRate = (100 - mortalityRate).toFixed(2);

  const getRow = (title, key, formatFn, withStyle) => (
    <TableRow>
      <StyledTableCell style={{ fontWeight: "bold" }}>
        {title}
      </StyledTableCell>
      <StyledTableCell style={withStyle ? { color: "#DB7C00" } : {}}>
        {formatFn(confirmed[key])}
      </StyledTableCell>
      <StyledTableCell style={withStyle ? { color: "#F44336" } : {} }>
        {formatFn(deaths[key])}
      </StyledTableCell>
      <StyledTableCell style={withStyle ? { color: "#478C30" } : {} }>
        {formatFn(recovered[key])}
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
                <StyledTableCell
                  id="recovered"
                  style={{ color: "#478C30" }}
                >
                  Recovered
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getRow("Total Cases", "total", formatFn)}
              {getRow("New Cases", "newCases", indicatorFn, true)}
              {getRow("Percent Change", "percentChange", percentFn)}
              {getRow("Peak", "maxCases", formatFn)}
              {getRow("Days Since Peak", "daysSince", idFn)}
              {getRow("Percent Below Peak", "percentBelow", percentFn)}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          className={classes.grid}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography className={classes.recoveredText} align="center">
              Recovery Rate: {recoveryRate}%
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography className={classes.deathsText} align="center">
              Mortality Rate: {mortalityRate}%
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {buttonComponent ? buttonComponent : null }
      </CardActions>
    </Card>
  );
}