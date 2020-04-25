import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { StyledTableCell } from "../Shared/CustomComponents";
import { formatNumber } from "../../helpers/conversions";

const useStyle = makeStyles({
  root: {
    background: "#373B52",
    color: "#3BBA9C"
  },
  button: {
    background: '#3C3F58',
    color: '#3BBA9C',
    height: 48,
    marginLeft: 8,
    border: "1px solid #3BBA9C",
    "&:hover": {
      background: '#3C3F58',
      opacity: 0.8
    }
  },
  header: {
    backgroundImage: `url(${require("../../static/coronavirus.jpg")})`,
    color: "#2E3047"
  },
});

export default function SummaryCard(props) {
  const { data, fetchFn, size } = props;
  const { confirmed, deaths } = data;
  const { country, index } = confirmed;

  const classes = useStyle();

  const getRow = (title, key, endChar="") => (
    <TableRow>
      <StyledTableCell style={{ fontWeight: "bold" }}>{title}</StyledTableCell>
      <StyledTableCell>
        {`${formatNumber(confirmed[key])}${endChar}`}
      </StyledTableCell>
      <StyledTableCell>
        {`${formatNumber(deaths[key])}${endChar}`}
      </StyledTableCell>
    </TableRow>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title={country}
        subheader={`#${index} in Confirmed Cases`}
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
              {getRow("Total Cases", "total")}
              {getRow("New Cases", "newCases")}
              {getRow("Percent Change", "percentChange", "%")}
              {getRow("Max # of Cases", "maxCases")}
              {getRow("Days Since Peak", "daysSince")}
              {getRow("Percent Below Peak", "percentBelow", "%")}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Tooltip title={`Search for ${country}`} placement="right">
          <Button
            className={classes.button}
            size="small"
            variant="outlined"
            onClick={() => fetchFn(country)}
          >
            MORE DETAILS
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}