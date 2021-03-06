import React from "react";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  root: {
    border: "3px solid rgba(0, 0, 0, 0.2)",
    borderRadius: 4,
    padding: 16
  },
  media: {
    height: 130,
    marginRight: 5,
    backgroundColor: "rgba(0, 0, 0, 0.15)"
  },
  base: {
    backgroundColor: "rgba(0, 0, 0, 0.15)"
  }
});

export default function NewsSkeleton(props) {
  const { animation } = props;
  const classes = useStyle();

  return (
    <Grid container className={classes.root} direction="row">
      <Grid item xs={5} sm={3} md={3} lg={2}>
        <Skeleton animation={animation} className={classes.media} width="95%" variant="rect" />
      </Grid>
      <Grid item xs={7} sm={9} md={9} lg={10}>
        <Grid container direction="column">
          <Skeleton className={classes.base} animation={animation} variant="text" width="80%" height={25} />
          <Skeleton className={classes.base} animation={animation} height={25} />
          <Skeleton className={classes.base} animation={animation} height={25} />
          <Skeleton className={classes.base} animation={animation} height={25} />
          <Skeleton className={classes.base} animation={animation} height={25} />
        </Grid>
      </Grid>
    </Grid>
  );
}