import { Grid } from "@material-ui/core";
import React from "react";

const Summarized = ({ summarized }) => (
  <Grid container>
    <Grid item xs={5}>
      <p>{summarized.name}</p>
    </Grid>
    <Grid item xs={3}>
      <p>{summarized.current}</p>
    </Grid>
    <Grid item xs={3}>
      <p>{summarized.newDeal}</p>
    </Grid>
  </Grid>
);

export default Summarized;
