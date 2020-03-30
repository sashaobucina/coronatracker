import React, { useEffect, useState } from "react";
import { IconButton, Tooltip, ButtonGroup } from "@material-ui/core";
import { ArrowBack, ArrowForward, PlayArrow, Pause, Restore } from "@material-ui/icons";

function PlayButton(props) {
  const [playing, setPlaying] = useState(false);
  const { indexValue, maxIndex, onStepClick, updateIndexState } = props;

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        if (indexValue < maxIndex) {
          updateIndexState(indexValue + 1);
        } else {
          setPlaying(!playing);
        }
      }, 150);
      return () => clearInterval(interval)
    }
  }, [playing, props]);

  const restore = () => {
    const { updateIndexState } = props;
    setPlaying(false);
    updateIndexState(0);
  }

  const playButton = playing
    ? (
      <Tooltip title="Pause" placement="bottom">
        <IconButton color="inherit" size="medium" onClick={() => setPlaying(false)}>
          <Pause />
        </IconButton>
      </Tooltip>
    )
    : (
      <Tooltip title="Play" placement="bottom">
        <IconButton onClick={() => setPlaying(true)}>
          <PlayArrow />
        </IconButton>
      </Tooltip>
    );

  return (
    <ButtonGroup color="inherit">
      {playButton}
      <Tooltip title="Reset" placement="bottom">
        <IconButton onClick={restore}>
          <Restore />
        </IconButton>
      </Tooltip>
      <Tooltip title="Decrement">
        <IconButton onClick={(_) => onStepClick(maxIndex, false)}>
          <ArrowBack />
        </IconButton>
      </Tooltip>
      <Tooltip title="Increment">
        <IconButton onClick={(_) => onStepClick(maxIndex, true)}>
          <ArrowForward />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}

export default PlayButton;