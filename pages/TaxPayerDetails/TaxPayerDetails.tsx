import React from "react";
import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { update } from "../../redux/TaxPayerSlice/TaxPayerSlice";
import { calculateAnnualAverageIncome } from "../../redux/TaxCalculationDetailsSlice/TaxCalculationDetailsSlice";
import { calculateTaxationBase } from "../../redux/TaxCalculationDetailsSlice/TaxCalculationDetailsSlice";

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
    lumpSumPercentage,
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
              dispatch(calculateAnnualAverageIncome({
                annualRevenueNetto: Number(e.target.value),
                annualTaxDeductibleExpenses,
              }));
              dispatch(calculateTaxationBase({
                annualAverageIncome: Number(e.target.value) - annualTaxDeductibleExpenses,
                annualSocialInsurance: annualSocialInsurance,
              }));
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
              dispatch(calculateAnnualAverageIncome({
                annualRevenueNetto,
                annualTaxDeductibleExpenses: Number(e.target.value),
              }));
              dispatch(calculateTaxationBase({
                annualAverageIncome: annualRevenueNetto - Number(e.target.value),
                annualSocialInsurance: annualSocialInsurance,
              }));
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
                       dispatch(calculateAnnualAverageIncome({
                         annualRevenueNetto,
                         annualTaxDeductibleExpenses: annualTaxDeductibleExpenses,
                       }));
                       dispatch(calculateTaxationBase({
                         annualAverageIncome: annualRevenueNetto - annualTaxDeductibleExpenses,
                         annualSocialInsurance: Number(e.target.value),
                       }));
                     }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={3}>
          <TextField id="field-3"
                     label="Średni dochód"
                     variant="outlined"
                     value={annualAverageIncome}
                     disabled={true}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField id="field-5"
                     label="Podstawa opodatkowania"
                     variant="outlined"
                     value={taxationBase}
                     disabled={true}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl>
            <InputLabel id="lump-sum-percentage-label">Stawka ryczałtowa</InputLabel>
            <Select
              labelId="lump-sum-percentage-label"
              id="lump-sum-percentage"
              value={lumpSumPercentage}
              label="Stawka ryczałtowa"
              onChange={(e) => dispatch(update({ lumpSumPercentage: Number(e.target.value) }))}
            >
              <MenuItem value={0.1}>0.1</MenuItem>
              <MenuItem value={0.12}>0.12</MenuItem>
              <MenuItem value={0.15}>0.15</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default TaxPayerDetails;
