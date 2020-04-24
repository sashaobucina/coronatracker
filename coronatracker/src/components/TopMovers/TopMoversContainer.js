import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  FormControlLabel,
  Tooltip,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MoverButtonGroup from "../Buttons/MoverButtonGroup";
import TableSearch from "./TableSearch";
import TopMoversTable from "./TopMoversTable";
import { CustomSwitch } from "./CustomComponents"
import { PREFETCH_URL } from "../../helpers/misc";
import { SERVER_ALERT } from "../../helpers/alerts";

const useStyles = makeStyles({
  grid: {
    marginTop: 75
  }
})

const formatRows = (topMovers) => {
  return topMovers.map((mover) => {
    const country = mover[0];
    const [ percent, change, total ] = mover[1];
    return { country, change, percent, total };
  })
}

const initialReport = "confirmed";
const emptyInfo = { "top_gainers": [], "top_losers": [] };
const initialData = { "confirmed": emptyInfo, "deaths": emptyInfo };

export default function TopMoversContainer(props) {
  const [ dense, setDense ] = useState(false);
  const [ query, setQuery ] = useState("");
  const [ report, setReport ] = useState(initialReport);
  const [topMovers, setTopMovers] = useState(initialData);

  const matches = useMediaQuery('(min-width:960px)');
  const { match, setAlert, updatePath } = props;

  useEffect(() => {
    updatePath(match.url);
  }, [match, updatePath]);

  useEffect(() => {
    setDense(!matches)
  }, [matches])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = PREFETCH_URL + "top-movers";
        const response = await axios.get(url);
        setTopMovers(response.data);
      } catch (e) {
        console.error(e);
        setAlert(SERVER_ALERT);
      }
    };
    fetchData();
  }, [setAlert])

  const { top_gainers, top_losers } = topMovers[report];
  const gainerRows = formatRows(top_gainers);
  const loserRows = formatRows(top_losers);

  const classes = useStyles();

  const handleReportChange = (report) => {
    setReport(report)
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
          order="asc"
          report={report}
          rows={ query ? gainerRows.filter(x => x["country"].toLowerCase().includes(query)) : gainerRows }
          title="Top Gainers"
          up={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TopMoversTable
          dense={dense}
          order="desc"
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