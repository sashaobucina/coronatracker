import React from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip
} from "@material-ui/core";
import {
  CenterFocusStrong,
  ZoomIn,
  ZoomOut
} from "@material-ui/icons";

export default function HeatMapButtons(props) {
  const { handleReCenter, handleZoomIn, handleZoomOut } = props;
  return (
    <ButtonGroup color="inherit" size="small">
      <Tooltip title="Zoom In" placement="left">
        <IconButton onClick={handleZoomIn}>
          <ZoomIn />
        </IconButton>
      </Tooltip>
      <Tooltip title="Re-center" placement="bottom">
        <IconButton onClick={handleReCenter}>
          <CenterFocusStrong />
        </IconButton>
      </Tooltip>
      <Tooltip title="Zoom Out" placement="right">
        <IconButton onClick={handleZoomOut}>
          <ZoomOut />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}