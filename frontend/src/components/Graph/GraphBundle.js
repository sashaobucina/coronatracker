import React, { Component } from "react";
import { Button, ButtonGroup, Grid, IconButton, Typography, Tooltip, } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import DateSlider from "../Slider/DateSlider"
import GraphDerivative from "./GraphDerivative"
import GraphOverall from "./GraphOverall";
import GraphTrajectory from "./GraphTrajectory";
import { convertDataToWeekly, convertToDates } from "../../helpers/conversions";

class GraphBundle extends Component {
  render() {
    const { country, data, indexValue, scale, onPlayClick, updateIndexState, updateScale } = this.props;
    const { overall, first_derivative_data, second_derivative_data } = data;

    // collect data in proper format
    const weeklyData = convertDataToWeekly(overall);
    const dates = convertToDates(overall, weeklyData.length);

    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={12}>
          <Typography align="center" variant="h4">COVID-19 Cases ({country})</Typography>
        </Grid>
        <Grid item xs={10} sm={10}>
          <GraphOverall data={overall} />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <Typography align="center" variant="h5">Rate of Change in Cases</Typography>
          <GraphDerivative data={first_derivative_data} dataKey={"first_derivative"} />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <Typography align="center" variant="h5">Acceleration of Change</Typography>
          <GraphDerivative data={second_derivative_data} dataKey={"second_derivative"} />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} style={{ marginBottom: 20 }}>
          <Typography align="center" style={{ textTransform: "capitalize" }} variant="h5">COVID-19 Trajectory ({scale})</Typography>
          <GraphTrajectory data={weeklyData.slice(0, indexValue)} scale={scale} />
          <ButtonGroup color="primary">
            <Tooltip title={scale !== "log" ? "Convert to logarithmic scale" : ""} placement="top">
              <Button variant="contained" disabled={scale === "log"} onClick={() => updateScale("log")}>Log</Button>
            </Tooltip>
            <Tooltip title={scale !== "linear" ? "Convert to linear scale" : ""} placement="right">
              <Button variant="contained" disabled={scale === "linear"} onClick={() => updateScale("linear")}>Linear</Button>
            </Tooltip>
          </ButtonGroup>
          <Typography align="center" fontStyle="oblique" style={{ marginBottom: 40 }} variant="body2">← Tune slider to view changes over time →</Typography>
          <DateSlider dates={dates} updateState={updateIndexState} value={indexValue} />
          <ButtonGroup color="inherit" size="medium" variant="outlined">
            <Tooltip title="Decrement">
              <IconButton onClick={(_) => onPlayClick(dates.length - 1, false)}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Increment">
              <IconButton onClick={(_) => onPlayClick(dates.length - 1, true)}>
                <ArrowForward />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }
}

export default GraphBundle;