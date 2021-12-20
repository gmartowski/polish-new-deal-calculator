import React from 'react';
import { useForm } from "react-hook-form";
import TaxPayerDetails from "../TaxpayerDetails/TaxPayerDetails";
import FlatTaxContainer from "../FlatTax/FlatTaxContainer";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import LumpSum from "../LumpSum/LumpSum";
import ProgressiveTax from "../ProgressiveTax/ProgressiveTax";
import PrivateLimitedCompany from "../PrivateLimitedCompany/PrivateLimitedCompany";
import { IFinalIncomesState } from "../../redux/taxpayerSlice";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export interface IChartData {
  name: 'Podatek Liniowy' | 'Ryczałt' | 'Skala podatkowa' | 'Spółka z o.o.';
  current: number;
  newDeal: number;
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const App = () => {

  const {  handleSubmit,  formState } = useForm();

  const [value, setValue] = React.useState(0);
  const finalData = useSelector((state: RootState) => state.finalIncomeReducer);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const convertFinalData = (data: IFinalIncomesState) => {
    return Object.keys(data).map((item) => data[item]);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12}>
              <TaxPayerDetails/>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Podatek liniowy" {...a11yProps(0)} />
                    {/*<Tab label="Ryczałt" {...a11yProps(1)} />*/}
                    {/*<Tab label="Skala podatkowa" {...a11yProps(1)} />*/}
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <FlatTaxContainer />
                </TabPanel>
                {/*<TabPanel value={value} index={1}>*/}
                {/*  <LumpSum/>*/}
                {/*</TabPanel>*/}
                {/*<TabPanel value={value} index={2}>*/}
                {/*  <ProgressiveTax/>*/}
                {/*</TabPanel>*/}
                {/*<TabPanel value={value} index={3}>*/}
                {/*  <PrivateLimitedCompany/>*/}
                {/*</TabPanel>*/}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
