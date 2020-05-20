import React from "react";
import { Button, Tooltip } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#3C3F58',
    color: '#3BBA9C',
    height: 48,
    marginLeft: 8,
    "&:hover": {
      backgroundColor: '#3C3F58',
      opacity: 0.8
    },
    "&.Mui-disabled": {
      backgroundColor: '#3C3F58',
    }
  }
})

export default function SearchButton(props) {
  const { onClick, disabled } = props;
  const classes = useStyles();
  return (
    <Tooltip title="Search">
      <Button
        className={classes.root}
        color="inherit"
        disabled={disabled}
        fullWidth
        variant="contained"
        onClick={onClick}
        startIcon={ <SearchIcon /> }
      >
        Search
      </Button>
    </Tooltip>
  );
}