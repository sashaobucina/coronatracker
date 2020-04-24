import React, { useState } from "react";
import range from "lodash/range";
import {
  Button,
  ButtonGroup,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import SummaryCard from "./SummaryCard";

const useStyle = makeStyles({
  root: {
    marginTop: 30,
    marginBottom: 50
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

export default function SummaryContainer(props) {
  const [checkList, setCheckboxList] = useState(range(10).map(() => true));
  const { data, fetchFn } = props;
  const { confirmed, deaths } = data

  const classes = useStyle();
  const matches = useMediaQuery('(min-width:960px)');
  const size = matches ? "medium" : "small";

  const getCardData = (idx) => ({
    confirmed: confirmed[idx],
    deaths: deaths[idx]
  })

  const selectAll = () => setCheckboxList(range(10).map(() => true));
  const deselectAll = () => setCheckboxList(range(10).map(() => false));

  const getCountry = (idx) => (
    confirmed[idx]["country"]
  );

  const getCardContainers = () => (
    checkList.reduce((acc, curr, idx) => {
      if (curr) {
        acc.push((
          <React.Fragment key={idx}>
            <Grid item xs={10} sm={10} md={5} lg={5} xl={5}>
              <SummaryCard data={getCardData(idx)} fetchFn={fetchFn} size={size} />
            </Grid>
          </React.Fragment>
        ));
      }
      return acc;
    }, [])
  );

  const setCheckbox = (idx) => (e) => {
    const newCheckList = checkList.slice();
    newCheckList.splice(idx, 1, e.target.checked);
    setCheckboxList(newCheckList);
  }

  const getCheckBoxes = () => {
    return checkList
      .map((_, i) => (
        <FormControlLabel
          classes={{ label: matches ? classes.labelMed : classes.labelSmall }}
          control={
            <MyCheckbox
              checked={checkList[i]}
              onChange={setCheckbox(i)}
              size={matches ? "medium" : "small"}
            />
          }
          key={i}
          label={getCountry(i)}
        />
      ));
  }

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      alignItems="center"
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
          <Button onClick={selectAll}>
            Select all
          </Button>
          <Button onClick={deselectAll}>
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
      {getCardContainers()}
    </Grid>
  );
}