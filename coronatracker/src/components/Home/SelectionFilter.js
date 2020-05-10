import React from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  button: { 
    "&:hover": {
      opacity: 0.8
    }
  },
  labelSmall: {
    fontSize: 13
  },
  labelMed: {
    fontSize: 16
  }
});

const MyCheckbox = withStyles({
  root: {
    color: "#3BBA9C",
    "&$checked": {
      color: "#3BBA9C"
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

export default function SelectionFilter(props) {
  const { checkList, countries, deselectAll, selectAll, setCheckList, size } = props;

  const classes = useStyle();

  const handleCheckList = (idx) => (e) => {
    const newCheckList = [...checkList];
    newCheckList.splice(idx, 1, e.target.checked);
    setCheckList(newCheckList);
  }

  const getCheckBoxes = () => {
    return checkList
      .map((_, i) => (
        <FormControlLabel
          classes={{ label: size === "medium" ? classes.labelMed : classes.labelSmall }}
          key={i}
          label={countries[i]}
          control={
            <MyCheckbox
              checked={checkList[i]}
              onChange={handleCheckList(i)}
              size={size}
            />
          }
        />
      ));
  }

  return (
    <Grid
      container
      justify="center"
      spacing={3}
    >
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <Typography align="left" color="inherit" variant="h4">
          Quick Summary
        </Typography>
        <Typography align="left" variant="caption">
          (Select/deselect countries of interest to show/hide summarized info)
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <ButtonGroup
          color="inherit"
          variant="outlined"
        >
          <Button className={classes.button} onClick={selectAll}>
            Select all
          </Button>
          <Button className={classes.button} onClick={deselectAll}>
            Deselect all
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <FormGroup row>
          {getCheckBoxes()}
        </FormGroup>
      </Grid>
    </Grid>
  );
}