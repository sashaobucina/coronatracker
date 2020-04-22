import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

export default function ReportIssueButton() {
  return (
    <Tooltip title="Report issue" placement="bottom">
      <Button
        color="inherit"
        href="https://github.com/sashaobucina/coronatracker/issues"
        size="small"
      >
        Report
      </Button>
    </Tooltip>
  );
}