import { Grid, makeStyles, TextField } from "@material-ui/core";
import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { update } from "../../redux/taxpayerSlice";

const useStyles = makeStyles({
  grid: {
    marginLeft: '10px'
  }
})

const TaxpayerDetails = () => {
  const classes = useStyles();
  const taxpayerDetails = useSelector((state: RootState) => state.taxpayer);
  const averageIncome = taxpayerDetails.revenueNetto - taxpayerDetails.costsNetto;
  const taxationBase = averageIncome - taxpayerDetails.healthInsurance;
  const dispatch = useDispatch();

  return (
    <Grid container spacing={6} className={classes.grid}>
      <Grid item xs={2}>
        <TextField
          id="field-1"
          label="Średni, roczny przychód netto (bez VAT)"
          variant="outlined"
          defaultValue={taxpayerDetails.revenueNetto}
          onChange={(e) => dispatch(update({ revenueNetto: Number(e.target.value) }))}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField fullWidth
                   id="field-2"
                   label="Średnie, roczne koszty uzyskania przychodów (netto)"
                   variant="outlined"
                   defaultValue={taxpayerDetails.costsNetto}
                   onChange={(e) => dispatch(update({ costsNetto: Number(e.target.value) }))}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField fullWidth
                   id="field-3"
                   label="Średni dochód"
                   variant="outlined"
                   defaultValue={averageIncome}
                   onChange={(e) => dispatch(update({ averageIncome: Number(e.target.value) }))}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField fullWidth
                   id="field-4"
                   label="Składki na ZUS (rocznie)"
                   variant="outlined"
                   defaultValue={taxpayerDetails.healthInsurance}
                   onChange={(e) => dispatch(update({ healthInsurance: Number(e.target.value) }))}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField fullWidth
                   id="field-5"
                   label="Podstawa opodatkowania"
                   variant="outlined"
                   defaultValue={taxationBase}
                   onChange={(e) => dispatch(update({ taxationBase: Number(e.target.value) }))}
        />
      </Grid>
    </Grid>
)
};

export default TaxpayerDetails;
