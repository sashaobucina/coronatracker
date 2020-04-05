import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  button: {
    background: '#3C3F58',
    color: '#3BBA9C',
    height: 48,
    "&:hover": {
      background: '#3C3F58',
      opacity: 0.8
    }
  }
})

export default function ReportIssueButton() {
  const classes = useStyles();
  return (
    <Tooltip title="Report an issue" placement="bottom">
      <Button
        className={classes.button}
        color="inherit"
        href="https://github.com/sashaobucina/coronatracker/issues"
        size="large"
        endIcon={<ReportOutlinedIcon />}
      >
        Report Issue
      </Button>
    </Tooltip>
  );
}