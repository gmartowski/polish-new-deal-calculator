import React from 'react';
import { useForm } from "react-hook-form";
import TaxpayerDetails from "../TaxpayerDetails/TaxpayerDetails";
import FlatTax from "../FlatTax/FlatTax";
import { Provider } from 'react-redux';
import { store } from "../../redux/store";
import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import LumpSum from "../LumpSum/LumpSum";
import ProgressiveTax from "../ProgressiveTax/ProgressiveTax";
import PrivateLimitedCompany from "../PrivateLimitedCompany/PrivateLimitedCompany";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const App = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12}>
                <TaxpayerDetails/>
              </Grid>
            </Grid>
            <Grid container>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Liniówka" {...a11yProps(0)} />
                    <Tab label="Ryczałt" {...a11yProps(1)} />
                    <Tab label="Skala podatkowa" {...a11yProps(1)} />
                    <Tab label="Spółka z o.o." {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Grid item xs={12}><FlatTax/></Grid>

                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid item xs={12}><LumpSum/></Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Grid item xs={12}><ProgressiveTax /></Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Grid item xs={12}><PrivateLimitedCompany /></Grid>
                </TabPanel>
              </Box>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Provider>
  );
};
