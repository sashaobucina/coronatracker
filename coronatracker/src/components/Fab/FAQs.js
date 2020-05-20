import React from "react";
import { Button, Divider, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Tooltip, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import { useWindowDimensions } from "../../helpers/windowProvider";

const useStyles = makeStyles({
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
  },
  icon: {
    color: "#3BBA9C"
  }
});

export default function FAQs() {
  const { height, width } = useWindowDimensions();
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <Typography variant="caption">
          NOTE: This project is maintained by a one-man team, responses to any issues may be delayed
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                classes={{ expandIcon: classes.icon }}
                expandIcon={<ExpandMore />}
              >
                <Typography>
                  Q: What is the COVID-19 Tracker?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  A: The COVID-19 Tracker is an informative web app that tracks the trends and movements of the COVID-19 virus through visuals and tabular data. Go to the home page and search for a country of interest to get started!
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                classes={{ expandIcon: classes.icon }}
                expandIcon={<ExpandMore />}
              >
                <Typography>
                  Q: What are key indicators that we are "flattening the curve"?
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
              <ExpansionPanelSummary
                classes={{ expandIcon: classes.icon }}
                expandIcon={<ExpandMore />}
              >
                <Typography align="center">
                  Q: Why is some data missing or different from other sites?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="subtitle1">
                  A: Collecting and reporting data on a global scale is an extremely challenging task and requires cooperation on a global scale. Hence, any countries that do not disclose their data for COVID-19 will not be shown here.
                  <br/><br/>
                  This site aggregates all the data from the John Hopkins CSSE repository, which in turn collects data from the World Health Organization (WHO) and various governments/health organizations across the world. If there seems to be any inconsistencies with data, please consult the John Hopkins CSSE repository to view if these issues have already been brought to attention or have been addressed.
                </Typography>
              </ExpansionPanelDetails>
              <Divider className={classes.divider} />
              <ExpansionPanelActions>
                <Tooltip title="View all current issues" placement="right">
                  <Button className={classes.button} href="https://github.com/CSSEGISandData/COVID-19/issues" size="small">
                    View issues
                  </Button>
                </Tooltip>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                classes={{ expandIcon: classes.icon }}
                expandIcon={<ExpandMore />}
              >
                <Typography align="center">
                  Q: How should some key metrics be interpreted?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="subtitle1">
                  A: The following list compiles all metrics that may not be self-evident:
                  <ul>
                    <li><b>New Cases:</b> The number of new cases reported in a day</li>
                    <li><b>Percent Change:</b> The percent change from the previous day to the current day</li>
                    <li><b>Peak:</b> The maximum number of new cases reported in a day</li>
                    <li><b>Percent Below Peak:</b> The percent change of the difference between the peak and number of new cases, relative to the peak</li>
                  </ul>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                classes={{ expandIcon: classes.icon }}
                expandIcon={<ExpandMore />}
              >
                <Typography align="center">
                  Q: How should the derivative plots be interpreted for rate of change and acceleration?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="subtitle1">
                  A: When dealing with rate of change, the first derivative is involved. Hence, this figure plots the amount of new cases per day against time as a gradient. The greater the points, the more cases a country is experiencing per day. This can be seen as the speed at which the virus growing.
                  <br/><br/>
                  The acceleration figure plots the change in the speed of new cases over time. When this plot is positive, it means the amount of new cases is accelerating, and negative values means it is decelerating.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                classes={{ expandIcon: classes.icon }}
                expandIcon={<ExpandMore />}
              >
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
      <Grid item xs={1} sm={1} md={1} lg={1} />
      </Grid>
    </Grid>
  );
}