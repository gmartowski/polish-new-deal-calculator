import React from 'react';
import FlatTaxContainer from "../FlatTax/FlatTaxContainer";
import { Box, Grid } from "@material-ui/core";
import LumpSumContainer from "../LumpSum/LumpSumContainer";
import TaxPayerDetails from "../TaxPayerDetails/TaxPayerDetails";
import ProgressiveTaxContainer from "../ProgressiveTax/ProgressiveTaxContainer";
import Invoices from "../Invoices/Invoices";
import TabPanel from "../../components/TabPanel/TabPanel";
import TabPanelTabs from "../../components/TabPanel/TabPanelTabs/TabPanelTabs";

const App = () => {
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
              <TaxPayerDetails/>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabPanelTabs value={value} onChange={handleChange} aria-label="basic tabs example"/>
                </Box>
                <TabPanel value={value} index={0}>
                  <LumpSumContainer/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ProgressiveTaxContainer/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <FlatTaxContainer/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Invoices/>
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
export default App;