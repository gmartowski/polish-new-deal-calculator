import React from "react";
import { Grid, } from "@material-ui/core";
import TableComponent from "../../components/Table/Table";
import Summarized from "../../components/Table/Summarized/Summarized";

const FlatTax = ({ data: { common, summarized }, currency }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>

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
    </Grid>
  </Grid>
);

export default FlatTax;
