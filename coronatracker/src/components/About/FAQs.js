import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Tooltip, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import { useWindowDimensions } from "../../helpers/windowProvider";

const useStyles = makeStyles({
  root: {
    marginTop: 55,
    marginBottom: 50
  },
  panel: {
    background: "#3C3F58",
    color: "#3BBA9C"
  },
  divider: {
    background: "#2E3047"
  },
  button: {
    background: '#3C3F58',
    borderColor: '#3BBA9C',
    color: '#3BBA9C',
    "&:hover": {
      background: '#3C3F58',
      opacity: 0.8
    }
  }
});

export default function FAQs(props) {
  const { height, width } = useWindowDimensions();
  const classes = useStyles();

  useEffect(() => {
    const { match, updatePath } = props;
    updatePath(match.url);
  }, [props]);

  return (
    <Grid className={classes.root} container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={1} sm={2} md={2} lg={2} />
      <Grid item xs={10} sm={8} md={8} lg={8}>
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item>
            <Typography variant="h5">
              FAQs
            </Typography>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary expandIcon={<ExpandMore color="primary" />}>
                <Typography>
                  Q: What is the COVID-19 Tracker?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  A: The COVID-19 Tracker is an informative web app that tracks the trends and movements of the COVID-19 virus through visuals and graphical data. Go to the home page and search for a country of interest to get started!
                </Typography>
              </ExpansionPanelDetails>
              <Divider className={classes.divider} />
              <ExpansionPanelActions>
                <Tooltip title="Go to home" placement="right">
                  <Button className={classes.button} size="small" component={Link} to="/">
                    Back to home
                  </Button>
                </Tooltip>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary expandIcon={<ExpandMore color="primary" />}>
                <Typography>
                  Q: What are key indicators that the virus is no longer exponentially growing or that we are "flattening the curve"?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  A: When dealing with exponential growth, flattening occurs when the rate of change of new cases is decreasing over a sustained period of time, meaning the rate of change plot starts trending downward for a consecutive period of time. On the rate of change plot, graphically, this looks as though we are descending from the peak.
                </Typography>
              </ExpansionPanelDetails>
              <Divider className={classes.divider} />
              <ExpansionPanelActions>
                <Tooltip title="Stay informed" placement="right">
                  <Button className={classes.button} href="https://www.google.com/covid19/" size="small">
                    Learn more
                  </Button>
                </Tooltip>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary expandIcon={<ExpandMore color="primary" />}>
                <Typography align="center">
                  Q: How should the derivative plots be interpreted for rate of change and acceleration?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="subtitle1">
                  A: When dealing with rate of change, the first derivative is involved. Hence, this figure plots the amount of new cases per day against time. The greater the points, the more cases a country is experiencing per day. This can be seen as the speed at which the virus growing.
                  <br /><br />
                  The acceleration figure plots the change in the speed of new cases over time. When this plot is positive, it means the amount of new cases is accelerating, and negative values means it is decelerating.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary expandIcon={<ExpandMore color="primary" />}>
                <Typography align="center">
                  Q: How should the trajectory plot be interpreted?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography>
                      A: The following is a great video explaining the interpretation and motivation behind this plot:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <iframe
                      height={height * 0.5}
                      width={width * 0.5}
                      src="https://www.youtube-nocookie.com/embed/54XLXg4fYsc?start=170"
                      title="Trajectory video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}