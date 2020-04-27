import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControlLabel,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { CustomSwitch } from "../Shared/CustomComponents";
import PeakTable from "./PeakTable";
import TableSearch from "../Shared/TableSearch";
import { PREFETCH_URL } from "../../helpers/misc";
import { SERVER_ALERT } from "../../helpers/alerts";
import { getDate } from "../../helpers/conversions";


const useStyles = makeStyles({
  grid: {
    marginTop: 75
  }
})

export default function PeakContainer(props) {
  // get size of screen by media query
  const matches = useMediaQuery('(min-width:960px)');

  const [rows, setRows] = useState([]);
  const [dense, setDense] = useState(false);
  const [query, setQuery] = useState("");
  const { match, setAlert, updatePath } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = PREFETCH_URL + "peak-data";
        const { data } = await axios.get(url);
        setRows(data);
      } catch (e) {
        console.error(e);
        setAlert(SERVER_ALERT);
      }
    }
    fetchData();
  }, [setAlert]);

  useEffect(() => {
    setDense(!matches)
  }, [matches])

  useEffect(() => {
    updatePath(match.url);
  }, [match, updatePath]);

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const classes = useStyles();
  const subheader = rows.length === 0 ? "" : `(as of ${getDate(rows[0]["lastDate"])})`;

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
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography align="center" variant="h4">
          COVID-19 Tracking - Days Since Peak
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={11} sm={11} md={11} lg={11}>
        <TableSearch setQuery={setQuery} />
      </Grid>
      <Grid item md={1} lg={1} />
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <PeakTable
          dense={dense}
          rows={ query ? rows.filter(x => x["country"].toLowerCase().includes(query)) : rows }
          title={`Days Since Peak # of New Cases ${subheader}`}
        />
      </Grid>
      <Grid item md={1} lg={1} />
      <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
      <Grid item xs={11} sm={11} md={11} lg={11}>
        <Tooltip title="Change table padding" placement="bottom">
          <FormControlLabel
            control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding (for mobile users)"
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
}