import React, { useEffect, useState, useContext, useRef } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { get, isEmpty } from "lodash";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../App";
import DateSlider from "../Slider/DateSlider";
import HeatMap from "./HeatMap";
import HeatMapButtons from "./HeatMapButtons";
import HeatMapLegend from "./HeatMapLegend";
import SliderButtonGroup from "../Buttons/SliderButtonGroup";
import { HEATMAP_URL } from "../../helpers/misc";
import { SERVER_ALERT } from "../../helpers/alerts";

const useStyle = makeStyles({
  root: {
    marginTop: 76,
    marginBottom: 30,
  },
});

function getDates(data) {
  return data.map((entry) => get(entry, "date", ""));
}

export default function HeatMapContainer(props) {
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(-1);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const { state, dispatch } = useContext(AppContext);
  const { match } = props;
  const pathRef = useRef(match.url);

  const classes = useStyle();
  const matches = useMediaQuery("(min-width:960px)");

  // extract all necessary info from heatmap data
  const heatMapData = state.heatmap;
  const dates = getDates(heatMapData);
  const maxIndex = heatMapData.length - 1;
  const currData = get(heatMapData, `[${index}].data`, []);
  const currDate = get(dates, index, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(HEATMAP_URL);
        dispatch({ type: "update-heatmap", payload: data });
        setIndex(data.length - 1);
      } catch (e) {
        console.error(e);
        dispatch({ type: "set-alert", payload: SERVER_ALERT });
      }
    };
    isEmpty(heatMapData) ? fetchData() : setIndex(heatMapData.length - 1);
  }, [dispatch, heatMapData]);

  useEffect(() => {
    dispatch({ type: "update-path", payload: pathRef.current });
  }, [dispatch]);

  function handleZoomIn() {
    if (position.zoom >= 5) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function handleReCenter() {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  }

  function onStepClick(ceilIndex, isIncrement) {
    isIncrement
      ? setIndex(index < ceilIndex ? index + 1 : 0)
      : setIndex(index > 0 ? index - 1 : ceilIndex);
  }

  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography align="center" variant="h4">
          COVID-19 Heat Map
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={10} sm={10} md={10} lg={10} style={{ marginTop: 25 }}>
        <DateSlider dates={dates} updateState={setIndex} value={index} />
        <Typography variant="body1">{`Slide to view changes over time - ${currDate}`}</Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid
        item
        xs={10}
        sm={10}
        md={10}
        lg={10}
        style={{ marginTop: 5, marginBottom: 10 }}
      >
        <SliderButtonGroup
          disabled={heatMapData.length === 0}
          indexValue={index}
          maxIndex={maxIndex}
          size={matches ? "medium" : "small"}
          speed={1}
          onStepClick={onStepClick}
          updateIndexState={setIndex}
        />
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={4} sm={5} md={5} lg={5} />
      <Grid item xs={4} sm={2} md={2} lg={2} align="center">
        <HeatMapButtons
          disabled={heatMapData.length === 0}
          handleReCenter={handleReCenter}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          setPosition={setPosition}
        />
      </Grid>
      <Grid item xs={4} sm={5} md={5} lg={5} />
      <Grid item md={1} lg={1} />
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <HeatMap
          data={currData}
          position={position}
          handleMoveEnd={handleMoveEnd}
          setContent={setContent}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </Grid>
      {matches ? (
        <Grid item md={1} lg={1}>
          <HeatMapLegend />
        </Grid>
      ) : (
        <HeatMapLegend />
      )}
    </Grid>
  );
}
