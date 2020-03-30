import React, { Component } from "react";
import { ButtonGroup, Tooltip, Button } from "@material-ui/core";

class ScaleButtonGroup extends Component {
  render() {
    const { scale, updateScale } = this.props;
    return (
      <ButtonGroup color="primary">
        <Tooltip title={scale !== "log" ? "Convert to logarithmic scale" : ""} placement="top">
          <Button variant="contained" disabled={scale === "log"} onClick={() => updateScale("log")}>
            Log
          </Button>
        </Tooltip>
        <Tooltip title={scale !== "linear" ? "Convert to linear scale" : ""} placement="right">
          <Button variant="contained" disabled={scale === "linear"} onClick={() => updateScale("linear")}>
            Linear
          </Button>
        </Tooltip>
      </ButtonGroup>
    )
  }
}

export default ScaleButtonGroup;