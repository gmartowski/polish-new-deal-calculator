import { Grid, TextField } from "@material-ui/core";
import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { update } from "../../redux/taxpayerSlice";

const TaxpayerDetails = () => {

  const taxpayerDetails = useSelector((state: RootState) => state.taxpayer);
  const dispatch = useDispatch();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField fullWidth
                   id="field-1"
                   label="Średni, roczny przychód netto (bez VAT)"
                   variant="outlined"
                   defaultValue={taxpayerDetails.revenueNetto}
                   onChange={(e) => dispatch(update({ revenueNetto: Number(e.target.value) }))}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth
                   id="field-2"
                   label="Średnie, roczne koszty uzyskania przychodów (netto)"
                   variant="outlined"
                   defaultValue={taxpayerDetails.costsNetto}
                   onChange={(e) => dispatch(update({ costsNetto: Number(e.target.value) }))}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth
                   id="field-3"
                   label="Średni dochód"
                   variant="outlined"
                   defaultValue={taxpayerDetails.averageIncome}
                   onChange={(e) => dispatch(update({ averageIncome: Number(e.target.value) }))}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth
                   id="field-4"
                   label="Składki na ZUS (rocznie)"
                   variant="outlined"
                   defaultValue={taxpayerDetails.healthInsurance}
                   onChange={(e) => dispatch(update({ healthInsurance: Number(e.target.value) }))}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth
                   id="field-5"
                   label="Podstawa opodatkowania"
                   variant="outlined"
                   defaultValue={taxpayerDetails.taxationBase}
                   onChange={(e) => dispatch(update({ taxationBase: Number(e.target.value) }))}
        />
      </Grid>
    </Grid>
  );
};

export default TaxpayerDetails;
