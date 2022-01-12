import React from "react";
import { Grid } from "@material-ui/core";

import Chart from "../../components/Chart/Chart";
import TableComponent from "../../components/Table/Table";
import Summarized from "../../components/Table/Summarized/Summarized";

const ProgressiveTax = ({ data: { common, summarized }, currency }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <p>* W przypadku działalności gospodarczej, do wzoru podstawiamy przychód pomniejszony o koszty prowadzenia działalności</p>
        <TableComponent
          common={common}
          taxationTypeDetails={{
            name: "Skala",
            info: "17% 32%",
          }}
          currency={currency}
        />
      </Grid>

      <Grid item xs={6}>
          <Summarized summarized={summarized}/>
        {/*<Chart chartData={common}/>*/}
      </Grid>
    </Grid>
  );
};

export default ProgressiveTax;
