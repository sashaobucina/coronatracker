import React, { useEffect, useState } from "react";
import { IconButton, Tooltip, ButtonGroup } from "@material-ui/core";
import { ArrowBack, ArrowForward, PlayArrow, Pause, Restore, SkipNext } from "@material-ui/icons";

export default function SliderButtonGroup(props) {
  const [ playing, setPlaying ] = useState(true);
  const { indexValue, maxIndex, onStepClick, speed, updateIndexState } = props;

  useEffect(() => {
    console.log(playing)
    if (playing) {
      const interval = setInterval(() => {
        const { indexValue, maxIndex, updateIndexState } = props;
        if (indexValue < maxIndex) {
          updateIndexState(indexValue + 1);
        } else {
          setPlaying(!playing);
        }
      }, 100 / speed);
      return () => clearInterval(interval)
    }
  }, [playing, speed, props]);

  const restore = () => {
    setPlaying(false);
    updateIndexState(0);
  }

  const playButton = playing
    ? (
      <Tooltip title="Pause animation" placement="top">
        <IconButton color="inherit" size="medium" onClick={() => setPlaying(false)}>
          <Pause />
        </IconButton>
      </Tooltip>
    )
    : (
      <Tooltip title="Play animation" placement="top">
        <IconButton onClick={() => indexValue < maxIndex ? setPlaying(true) : {}}>
          <PlayArrow />
        </IconButton>
      </Tooltip>
    );

  return (
    <ButtonGroup color="inherit">
      {playButton}
      <Tooltip title="Skip animation" placement="top">
        <IconButton onClick={() => updateIndexState(maxIndex)}>
          <SkipNext />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset" placement="top">
        <IconButton onClick={restore}>
          <Restore />
        </IconButton>
      </Tooltip>
      <Tooltip title="Decrement" placement="top">
        <IconButton onClick={(_) => onStepClick(maxIndex, false)}>
          <ArrowBack />
        </IconButton>
      </Tooltip>
      <Tooltip title="Increment" placement="top">
        <IconButton onClick={(_) => onStepClick(maxIndex, true)}>
          <ArrowForward />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}