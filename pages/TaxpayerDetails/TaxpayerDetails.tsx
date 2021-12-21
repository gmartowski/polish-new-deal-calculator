import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { calculate, update } from "../../redux/taxpayerSlice";

const useStyles = makeStyles({
  grid: {
    marginLeft: '10px',
    marginBottom: '30px',
  },
});

const TaxPayerDetails = () => {
  const classes = useStyles();
  const {
    annualRevenueNetto,
    annualTaxDeductibleExpenses,
    annualSocialInsurance,
  } = useSelector((state: RootState) => state.taxpayer);

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);

  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="field-1"
            label="Średni, roczny przychód netto (bez VAT)"
            variant="outlined"
            defaultValue={annualRevenueNetto}
            onChange={(e) => {
              dispatch(update({ annualRevenueNetto: Number(e.target.value) }));
              dispatch(calculate({ annualAverageIncome: Number(e.target.value), annualTaxDeductibleExpenses }));
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="field-2"
            label="Średnie, roczne koszty uzyskania przychodów (netto)"
            variant="outlined"
            defaultValue={annualTaxDeductibleExpenses}
            onChange={(e) => {
              dispatch(update({ annualTaxDeductibleExpenses: Number(e.target.value) }));
              dispatch(calculate({ annualTaxDeductibleExpenses: Number(e.target.value), annualRevenueNetto }));
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField id="field-4"
                     label="Składki na ZUS (rocznie)"
                     variant="outlined"
                     defaultValue={annualSocialInsurance}
                     onChange={(e) => {
                       dispatch(update({ annualSocialInsurance: Number(e.target.value) }));
                       dispatch(calculate({ annualSocialInsurance: Number(e.target.value), annualAverageIncome }));
                     }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={3}>
          <TextField id="field-3"
                     label="Średni dochód"
                     variant="outlined"
                     defaultValue={annualAverageIncome}
                     disabled={true}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField id="field-5"
                     label="Podstawa opodatkowania"
                     variant="outlined"
                     defaultValue={taxationBase}
                     disabled={true}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="lump-sum-percentage-label">Stawka ryczałtowa</InputLabel>
            <Select
              labelId="lump-sum-percentage-label"
              id="lump-sum-percentage"
              value={0}
              label="Stawka ryczałtowa"
              onChange={() => (0)}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default TaxPayerDetails;
