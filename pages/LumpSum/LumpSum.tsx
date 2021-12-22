import React from "react";
import { Grid } from "@material-ui/core";
import Chart from "../../components/Chart/Chart";
import TableComponent from "../../components/Table/Table";

const LumpSum = ({ data: { summarized, common }, currency }) => (

  <Grid container spacing={2}>

    <Grid item xs={6}>

      <TableComponent
        common={common}
        summarized={summarized}
        taxationTypeDetails={{
          name: "Ryczałt",
          info: "od przychodów ewidencjonowanych (dostępny do 2 mln euro przychodów)",
        }}
        currency={currency}
      />
    </Grid>

    <Grid item xs={6}>

      <Chart chartData={common}/>
    </Grid>
  </Grid>
);

export default LumpSum;
