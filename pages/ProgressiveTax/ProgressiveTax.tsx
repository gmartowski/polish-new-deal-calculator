import React from "react";
import { Grid } from "@material-ui/core";
import TableComponent from "../../components/Table/Table";
import Summarized from "../../components/Table/Summarized/Summarized";
import Chart from "../../components/Chart/Chart";

const ProgressiveTax = ({ data: { common, summarized, chart }, currency }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <p>* W przypadku działalności gospodarczej, do wzoru podstawiamy przychód pomniejszony o koszty prowadzenia
          działalności</p>
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
        <div style={{ height: '400px' }}>
          <Chart data={chart}/>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgressiveTax;
