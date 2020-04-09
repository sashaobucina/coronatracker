import React from "react";
import { Tooltip } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    background: '#3C3F58',
    color: '#3BBA9C',
    "&:hover": {
      background: '#3C3F58',
    }
  },
  confirmed: {
    background: "#3C3F58",
    color: "#212121",
    "&:hover": {
      background: "#3C3F58",
      color: "#DB7C00",
      fontWeight: "bolder",
      opacity: 0.8,
    },
    "&.Mui-selected": {
      background: '#3C3F58',
      color: "#DB7C00",
      fontWeight: "bold",
      "&:hover": {
        background: "#3C3F58",
        opacity: 1,
      },
    }
  },
  deaths: {
    background: "#3C3F58",
    color: "#212121",
    "&:hover": {
      background: "#3C3F58",
      color: "#F44336",
      fontWeight: "bolder",
      opacity: 0.8,
    },
    "&.Mui-selected": {
      background: '#3C3F58',
      color: "#F44336",
      fontWeight: "bold",
      "&:hover": {
        background: "#3C3F58",
        opacity: 1,
      },
    }
  }
});

export default function MoverButtonGroup(props) {
  const { report, setReport } = props;
  const classes = useStyles();

  const handleChange = (_, newCase) => {
    if (newCase) {
      setReport(newCase)
    }
  }

  return (
    <Tooltip title={"Toggle " + report} placement="bottom">
      <ToggleButtonGroup
        className={classes.root}
        value={report}
        exclusive
        size="small"
        onChange={handleChange}
      >
        <ToggleButton className={classes.confirmed} value="confirmed">
          Confirmed
        </ToggleButton>
        <ToggleButton className={classes.deaths} value="deaths">
          Deaths
        </ToggleButton>
      </ToggleButtonGroup>
    </Tooltip>
  );
}