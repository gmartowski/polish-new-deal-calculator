import React from 'react';
import { Grid } from "@material-ui/core";
import { AppData } from "./AppData";
import TabPanel from "../../components/TabPanel/TabPanel";
import TabPanelTabs from "../../components/TabPanel/TabPanelTabs/TabPanelTabs";
import FlatTaxContainer from "../FlatTax/FlatTaxContainer";
import LumpSumContainer from "../LumpSum/LumpSumContainer";
import TaxPayerDetails from "../TaxPayerDetails/TaxPayerDetails";
import ProgressiveTaxContainer from "../ProgressiveTax/ProgressiveTaxContainer";

const App = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (value): void => setValue(value);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TaxPayerDetails/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <TabPanelTabs value={value} handleChange={handleChange} tabs={AppData} aria-label="basic tabs example"/>
          <TabPanel value={value} index={0}><LumpSumContainer/></TabPanel>
          <TabPanel value={value} index={1}><ProgressiveTaxContainer/></TabPanel>
          <TabPanel value={value} index={2}><FlatTaxContainer/></TabPanel>
        </Grid>
      </Grid>
    </>
  );
};
export default App;