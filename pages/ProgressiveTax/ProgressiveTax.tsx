import React from "react";
import { Grid } from "@material-ui/core";

import Chart from "../../components/Chart/Chart";
import TableComponent from "../../components/Table/Table";

const ProgressiveTax = ({ data: { common, summarized }, currency }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        * W przypadku działalności gospodarczej, do wzoru podstawiamy przychód pomniejszony o koszty prowadzenia
        działalności
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

        {/*<Chart chartData={common}/>*/}
      </Grid>
    </Grid>
  );
};

export default ProgressiveTax;
