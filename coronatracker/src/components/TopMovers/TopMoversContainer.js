import React, { useState, useEffect, useContext, useRef } from "react";
import { assign, get } from "lodash";
import axios from "axios";
import {
  Grid,
  FormControlLabel,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../App";
import TopMoversTable from "./TopMoversTable";
import MoverButtonGroup from "../Buttons/MoverButtonGroup";
import TextSearch from "../Shared/TextSearch";
import { CustomSwitch } from "../Shared/CustomComponents";
import { TOP_MOVERS_URL } from "../../helpers/misc";
import { SERVER_ALERT } from "../../helpers/alerts";
import { getDate } from "../../helpers/conversions";

const useStyles = makeStyles({
  grid: {
    marginTop: 75,
  },
});

const indexRows = (topMovers) =>
  topMovers.map((mover, idx) => assign(mover, { index: idx + 1 }));

export default function TopMoversContainer(props) {
  const [dense, setDense] = useState(false);
  const [query, setQuery] = useState("");
  const [report, setReport] = useState("confirmed");
  const { state, dispatch } = useContext(AppContext);
  const { match } = props;
  const pathref = useRef(match.url)

  const classes = useStyles();
  const matches = useMediaQuery("(min-width:960px)");

  // extract all necessary info from top movers data
  const topMovers = state.topMovers;
  const date = get(topMovers, "date", null);
  const gainerRows = indexRows(get(topMovers, `${report}.top_gainers`, []));
  const loserRows = indexRows(get(topMovers, `${report}.top_losers`, []));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(TOP_MOVERS_URL);
        dispatch({ type: "update-top-movers", payload: data });
      } catch (e) {
        console.error(e);
        dispatch({ type: "set-alert", payload: SERVER_ALERT });
      }
    };
    if (topMovers === null) {
      fetchData();
    }
  }, [dispatch, topMovers]);

  useEffect(() => {
    dispatch({ type: "update-path", payload: pathref.current });
  }, [dispatch]);

  useEffect(() => {
    setDense(!matches);
  }, [matches]);

  const handleReportChange = (report) => {
    setReport(report);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const filterRows = (rows) => {
    return query
      ? rows.filter((row) => row["country"].toLowerCase().includes(query))
      : rows;
  };

  return (
    <Grid container className={classes.grid} direction="row" spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography align="center" variant="h4">
          COVID-19 Top Movers
        </Typography>
        <Typography align="center" variant="subtitle1">
          {date === null ? "" : `(as of ${getDate(date)})`}
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={11} sm={11} md={11} lg={11}>
        <TextSearch label="Search country" setQuery={setQuery} />
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={11} sm={11} md={11} lg={11}>
        <MoverButtonGroup report={report} setReport={handleReportChange} />
      </Grid>
      <Grid item md={1} lg={1} />
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TopMoversTable
          dense={dense}
          order="desc"
          report={report}
          rows={filterRows(gainerRows)}
          title="Top Gainers"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TopMoversTable
          dense={dense}
          order="asc"
          report={report}
          rows={filterRows(loserRows)}
          setDense={setDense}
          title="Top Decliners"
        />
      </Grid>
      <Grid item md={1} lg={1} />
      <Grid item md={1} lg={1} />
      <Grid item xs={10} sm={10} md={4} lg={4}>
        <Tooltip title="Change table padding" placement="bottom">
          <FormControlLabel
            control={
              <CustomSwitch checked={dense} onChange={handleChangeDense} />
            }
            label="Dense padding (for mobile users)"
          />
        </Tooltip>
      </Grid>
      <Grid item xs={2} sm={2} md={8} lg={8} />
    </Grid>
  );
}
