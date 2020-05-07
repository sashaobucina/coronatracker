import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { Brush, ResponsiveContainer, LineChart, XAxis, YAxis, Line, Legend, Tooltip } from "recharts";

import CustomTooltip from "./CustomTooltip";
import { rounded, getDate } from "../../helpers/conversions";
import { useWindowDimensions } from "../../helpers/windowProvider";
import { COLOURS } from "../../helpers/misc";

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
    marginTop: 25
  }
})

export default function ContributorGraph(props) {
  const { labels, data, date } = props;
  const { height } = useWindowDimensions();
  const classes = useStyles();

  const formatAxis = (num) => rounded(num);

  const subtitle = date === "" ? "" : `(as of ${getDate(date)})`;

  const lines = labels
    .filter(label => label !== "date")
    .map((label, i) => {
      return (<Line
        key={i}
        dataKey={label}
        dot={false}
        animationDuration={750}
        stroke={COLOURS[i]}
        strokeWidth={2}
        type="monotone"
      />);
    }
  );

  return (
    <Grid container className={classes.root} direction="row" alignItems="center" justify="center">
      <Grid item xs={1} />
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Typography align="center" variant="h4">
          Most Impacted Countries - Confirmed Cases
        </Typography>
        <Typography align="center" variant="subtitle1">
          {subtitle}
        </Typography>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <ResponsiveContainer height={0.75 * height}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#3BBA9C"
            />
            <YAxis stroke="#3BBA9C" tickFormatter={formatAxis} />
            { lines }
            <Tooltip
              content={<CustomTooltip title="Date" withIndex={true} />}
              cursor={false}
            />
            <Legend />
            <Brush
              dataKey="date"
              fill="#3C3F58"
              height={20}
              stroke='#3BBA9C'
              travellerWidth={8}
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} />
    </Grid>
  );
}