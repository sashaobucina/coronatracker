import React from "react";
import { times } from "lodash";
import Grid from "@material-ui/core/Grid";
import NewsSkeleton from "./NewsSkeleton";

export default function NewsBox() {

  const getSkeleton = () => {
    return times(10, (i => (
      <Grid item key={i}>
        <NewsSkeleton animation="wave" />
      </Grid>
    )));
  }

  return (
    <Grid container direction="column" spacing={1}>
      {getSkeleton()}
    </Grid>
  );
}