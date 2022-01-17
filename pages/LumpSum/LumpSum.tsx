import React from "react";
import { Grid } from "@material-ui/core";
import TableComponent from "../../components/Table/Table";
import Summarized from "../../components/Table/Summarized/Summarized";
import Chart from "../../components/Chart/Chart";

const LumpSum = (({ data: { common, summarized, chart }, currency }) => (
  <Grid container spacing={2}>

    <Grid item xs={6}>
      <p>
        <h3>Zmiany po wprowadzeniu Polskiego Ładu</h3>
        <ul>
        <li>brak możliwości odliczenia składki zdrowotnej od podatku</li>
        <li>zmiana sposobu naliczania składki zdrowotnej (3 progi (60%, 100%, 180%) - przychód do 60, do 300 i pow. 300 tys PLN, 9%). Jako przychód - kwota netto na FV. UWAGA ! Nie odejmujemy w tym przypadku skłądek ZUS !!!</li>
        <li>IT - zmiana opodatkowania z 15% na 12%</li>
      </ul>
      </p>
      <p>Sposób obliczenia podatku - liczymy podatek od PRZYCHODU (nasza pensja netto (bez VAT-u), minus składka ZUS, pomnożone razy stawka ryczałtu (dla IT 12%))</p>
      <TableComponent
        common={common}
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
));

export default LumpSum;
