import React from 'react';
import { useForm } from "react-hook-form";
import Header from '../../components/Header/Header';
import TaxpayerDetails from "../TaxpayerDetails/TaxpayerDetails";
import FlatTax from "../FlatTax/FlatTax";
import { Provider } from 'react-redux';
import { store } from "../../redux/store";
import { Grid } from "@material-ui/core";
import LumpSum from "../LumpSum/LumpSum";
import ProgressiveTax from "../ProgressiveTax/ProgressiveTax";


export const App = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Provider store={store}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header/>
        <Grid container>
          <Grid item xs={12}>
            <TaxpayerDetails/>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid item xs={6} spacing={6}>
              <Grid item xs={12}>
                <FlatTax/>
              </Grid>
              <Grid item xs={12}>
                <LumpSum/>
              </Grid>
              <Grid item xs={12}>
                <ProgressiveTax/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Provider>
  );
};
