import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import MoverButtonGroup from "../Buttons/MoverButtonGroup";
import TableSearch from "./TableSearch";
import TopMoversTable from "./TopMoversTable";
import { CustomSwitch } from "./CustomComponents"

const useStyles = makeStyles({
  grid: {
    marginTop: 25
  }
})

const createRows = (topMovers) => {
  return topMovers.map((mover, index) => {
    const country = mover[0];
    let [ percent, change, total ] = mover[1];
    index = index + 1
    change = "+" + change.toString()
    percent = percent.toFixed(3).toString() + "%"
    return { index, country, total, change, percent };
  })
}

export default function TopMovers(props) {
  const { topMovers } = props;
  const initialReport = "confirmed";

  const [ dense, setDense ] = useState(false);
  const [ query, setQuery ] = useState("");
  const [ data, setData ] = useState(topMovers[initialReport]);
  const [ report, setReport ] = useState(initialReport);

  const { top_gainers, top_losers } = data;
  const gainerRows = createRows(top_gainers);
  const loserRows = createRows(top_losers);

  const classes = useStyles();

  const handleReportChange = (report) => {
    setReport(report)
    setData(topMovers[report]);
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <Grid container className={classes.grid} direction="row" alignItems="center" alignContent="center" spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography align="center" variant="h4">
          COVID-19 Top Movers
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={11} sm={11} md={11} lg={11}>
        <TableSearch setQuery={setQuery} />
      </Grid>
      <Grid item md={1} lg={1}/>
      <Grid item xs={2} sm={4} md={4} lg={4}>
          <MoverButtonGroup report={report} setReport={handleReportChange} />
      </Grid>
      <Grid item xs={9} sm={7} md={7} lg={7} />
      <Grid item md={1} lg={1}/>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TopMoversTable
          dense={dense}
          report={report}
          rows={ query ? gainerRows.filter(x => x["country"].toLowerCase().includes(query)) : gainerRows }
          title="Top Gainers"
          up={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TopMoversTable
          dense={dense}
          report={report}
          rows={ query ? loserRows.filter(x => x["country"].toLowerCase().includes(query)) : loserRows }
          setDense={setDense}
          title="Top Losers"
          up={false}
        />
      </Grid>
      <Grid item md={1} lg={1} />
      <Grid item md={1} lg={1} />
      <Grid item xs={10} sm={10} md={4} lg={4}>
        <Tooltip title="Change table padding" placement="bottom">
          <FormControlLabel
            control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding (for mobile users)"
          />
        </Tooltip>
      </Grid>
      <Grid item xs={2} sm={2} md={8} lg={8} />
    </Grid>
  );
}