import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { get } from "lodash";
import {
  FormControlLabel,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../App";
import { CustomSwitch } from "../Shared/CustomComponents";
import MoverButtonGroup from "../Buttons/MoverButtonGroup";
import PeakTable from "./PeakTable";
import TextSearch from "../Shared/TextSearch";
import { PEAK_URL } from "../../helpers/misc";
import { SERVER_ALERT } from "../../helpers/alerts";
import { getDate } from "../../helpers/conversions";

const useStyles = makeStyles({
  grid: {
    marginTop: 75,
  },
});

export default function PeakContainer(props) {
  const [dense, setDense] = useState(false);
  const [query, setQuery] = useState("");
  const [report, setReport] = useState("confirmed");
  const { state, dispatch } = useContext(AppContext);
  const { match } = props;
  const pathRef = useRef(match.url)

  const classes = useStyles();
  const matches = useMediaQuery("(min-width:960px)");

  // extract all necessary info from peak data
  const peakData = state.peak;
  const rows = get(peakData, report, []);
  const date = get(peakData, "date", null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(PEAK_URL);
        dispatch({ type: "update-peak", payload: data });
      } catch (e) {
        console.error(e);
        dispatch({ type: "set-alert", payload: SERVER_ALERT });
      }
    };
    if (peakData === null) {
      fetchData();
    }
  }, [dispatch, peakData]);

  useEffect(() => {
    setDense(!matches);
  }, [matches]);

  useEffect(() => {
    dispatch({ type: "update-path", payload: pathRef.current });
  }, [dispatch]);

  const filterRows = () => {
    return query
      ? rows.filter((row) => row["country"].toLowerCase().includes(query))
      : rows;
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleReportChange = (report) => {
    setReport(report);
  };

  return (
    <Grid
      className={classes.grid}
      container
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
      spacing={2}
    >
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <Typography align="center" variant="h4">
          COVID-19 Days Since Peak
        </Typography>
        <Typography align="center" variant="subtitle1">
          {date === null ? "" : `(as of ${getDate(date)})`}
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={11} sm={11} md={11} lg={11}>
        <TextSearch label="Search country" setQuery={setQuery} />
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={11} sm={11} md={11} lg={11}>
        <MoverButtonGroup report={report} setReport={handleReportChange} />
      </Grid>
      <Grid item md={1} lg={1} />
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <PeakTable
          dense={dense}
          rows={filterRows()}
          report={report}
          title="Peak Data"
        />
      </Grid>
      <Grid item md={1} lg={1} />
      <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
      <Grid item xs={11} sm={11} md={11} lg={11}>
        <Tooltip title="Change table padding" placement="bottom">
          <FormControlLabel
            control={
              <CustomSwitch checked={dense} onChange={handleChangeDense} />
            }
            label="Dense padding (for mobile users)"
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
}
