import React from "react";
import { Grid, } from "@material-ui/core";
import TableComponent from "../../components/Table/Table";
import Summarized from "../../components/Table/Summarized/Summarized";
import Chart from "../../components/Chart/Chart";
import { flatTaxDescriptions } from "../ProgressiveTax/ProgressiveTaxData";
import DescriptionList from "../../components/DescriptionList/DescriptionList";

const FlatTax = ({ data: { common, summarized, chart }, currency }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <DescriptionList items={flatTaxDescriptions}/>
      <TableComponent common={common}
                      taxationTypeDetails={{
                        name: "Ryczałt",
                        info: "od przychodów ewidencjonowanych (dostępny do 2 mln euro przychodów)",
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

export default FlatTax;
