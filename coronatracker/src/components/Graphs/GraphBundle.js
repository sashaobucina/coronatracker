import React, { useState } from "react";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";

import DateSlider from "../Slider/DateSlider"
import DerivativeGraph from "./DerivativeGraph"
import OverallGraph from "./OverallGraph";
import TrajectoryGraph from "./TrajectoryGraph";
import MoverButtonGroup from "../Buttons/MoverButtonGroup";
import ScaleButtonGroup from "../Buttons/ScaleButtonGroup";
import SliderButtonGroup from "../Buttons/SliderButtonGroup";
import SummaryCard from "../Summary/SummaryCard";
import SpeedButtonGroup from "../Buttons/SpeedButtonGroup";
import { convertDataToWeekly, convertToDates, getDate } from "../../helpers/conversions";

export default function GraphBundle(props) {
  const [ indexValue, setIndexValue ] = useState(0);
  const [ speed, setSpeed ] = useState(1);
  const [ report, setReport ] = useState("confirmed")
  const [ scale, setScale ] = useState("log");
  const { country, data } = props;

  // collect data in proper format
  const { date, overall, first_derivative_data, second_derivative_data, summary } = data;
  const weeklyData = convertDataToWeekly(overall);
  const dates = convertToDates(overall, weeklyData.length);
  const maxIndex = dates.length - 1;

  function onStepClick(n, increment) {
    if (increment) {
      setIndexValue(indexValue < n ? indexValue + 1 : 0);
    } else {
      setIndexValue(indexValue > 0 ? indexValue - 1 : n);
    }
  }

  const matches = useMediaQuery('(min-width:960px)');
  const size = matches ? "medium" : "small";

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: 50, marginBottom: 20 }}>
        <Grid item xs={1} sm={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Typography color="inherit" variant="h5" align="center">
            Daily Report for {country} - {getDate(date)}
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} />
      </Grid>
      <Grid item xs={1} sm={1} md={3} lg={3} />
      <Grid item xs={10} sm={10} md={6} lg={6} style={{ marginBottom: 40 }}>
        <SummaryCard
          data={summary}
          size={size}
          subheader=""
        />
      </Grid>
      <Grid item xs={1} sm={1} md={3} lg={3} />
      <Grid item xs={12} sm={12}>
        <Typography align="center" variant="h4">COVID-19 Cases</Typography>
      </Grid>
      <Grid item xs={10} sm={10}>
        <OverallGraph data={overall} />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5} >
        <Typography align="center" variant="h5">Rate of Change</Typography>
        <DerivativeGraph data={first_derivative_data} report={report} />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5} >
        <Typography align="center" variant="h5">Acceleration of Change</Typography>
        <DerivativeGraph data={second_derivative_data} report={report} />
      </Grid>
      <Grid item xs={11} sm={11} md={11} lg={11} style={{ margin: 20 }}>
        <MoverButtonGroup report={report} setReport={setReport} />
        <Typography align="center" style={{ textTransform: "capitalize" }} variant="h5">COVID-19 Trajectory</Typography>
        <ScaleButtonGroup scale={scale} updateScale={setScale} />
        <TrajectoryGraph data={weeklyData.slice(0, indexValue)} scale={scale} />
        <Typography align="center" fontStyle="oblique"style={{ marginTop: 20 }} variant="body2">← Tune slider to view changes over time →</Typography>
        <DateSlider dates={dates} updateState={setIndexValue} value={indexValue} />
        <Grid container direction="column">
          <Grid item> 
            <SliderButtonGroup
              disabled={false}
              indexValue={indexValue}
              maxIndex={maxIndex}
              size={"medium"}
              speed={speed}
              onStepClick={onStepClick}
              updateIndexState={setIndexValue}
            />
          </Grid>
          <Grid item>
            <SpeedButtonGroup speed={speed} setSpeed={setSpeed} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}