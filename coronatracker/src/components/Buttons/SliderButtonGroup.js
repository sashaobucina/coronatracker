import React, { useEffect, useState } from "react";
import { IconButton, Tooltip, ButtonGroup } from "@material-ui/core";
import { ArrowBack, ArrowForward, PlayArrow, Pause, Restore, SkipNext } from "@material-ui/icons";

export default function SliderButtonGroup(props) {
  const [ playing, setPlaying ] = useState(true);
  const { disabled, indexValue, maxIndex, onStepClick, size, speed, updateIndexState } = props;

  useEffect(() => {
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
        <span>
          <IconButton
            color="inherit"
            size={size}
            disabled={disabled}
            onClick={() => setPlaying(false)}
          >
            <Pause />
          </IconButton>
        </span>
      </Tooltip>
    )
    : (
      <Tooltip title="Play" placement="top">
        <span>
          <IconButton
            color="inherit"
            size={size}
            disabled={disabled}
            onClick={() => indexValue < maxIndex ? setPlaying(true) : {}}
            >
            <PlayArrow />
          </IconButton>
        </span>
      </Tooltip>
    );

  return (
    <ButtonGroup size={size}>
      {playButton}
      <Tooltip title="Skip animation" placement="top">
        <span>
          <IconButton
            color="inherit"
            disabled={disabled}
            size={size}
            onClick={() => updateIndexState(maxIndex)}
          >
            <SkipNext />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Reset" placement="top">
        <span>
          <IconButton
            color="inherit"
            disabled={disabled}
            size={size}
            onClick={restore}
          >
            <Restore />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Decrement" placement="top">
        <span>
          <IconButton
            color="inherit"
            disabled={disabled}
            size={size}
            onClick={(_) => onStepClick(maxIndex, false)}
          >
            <ArrowBack />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Increment" placement="top">
        <span>
          <IconButton
            color="inherit"
            disabled={disabled}
            size={size}
            onClick={(_) => onStepClick(maxIndex, true)}
          >
            <ArrowForward />
          </IconButton>
        </span>
      </Tooltip>
    </ButtonGroup>
  );
}