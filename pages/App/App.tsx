import React from 'react';
import FlatTaxContainer from "../FlatTax/FlatTaxContainer";
import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import LumpSumContainer from "../LumpSum/LumpSumContainer";
import TaxpayerDetails from "../TaxPayerDetails/TaxpayerDetails";
import ProgressiveTaxContainer from "../ProgressiveTax/ProgressiveTaxContainer";
import Invoices from "../Invoices/Invoices";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
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
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
}

export const App = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              <TaxpayerDetails/>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {/*<Tab label="Podatek liniowy" {...a11yProps(0)} />*/}
                    <Tab label="Ryczałt" {...a11yProps(0)} />
                    <Tab label="Skala podatkowa" {...a11yProps(1)} />
                    {/*<Tab label="Faktury" {...a11yProps(2)} />*/}
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <LumpSumContainer/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ProgressiveTaxContainer/>
                </TabPanel>
                {/*<TabPanel value={value} index={0}>*/}
                {/*  <FlatTaxContainer/>*/}
                {/*</TabPanel>*/}
                {/*<TabPanel value={value} index={2}>*/}
                {/*  <Invoices/>*/}
                {/*</TabPanel>*/}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
