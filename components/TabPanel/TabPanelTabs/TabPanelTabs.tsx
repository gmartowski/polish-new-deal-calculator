import React from "react";
import { Tab, Tabs } from "@material-ui/core";
import { a11yProps } from "../A11YProps";

const TabPanelTabs = (value, handleChange) => (
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Ryczałt" {...a11yProps(0)} />
    <Tab label="Skala podatkowa" {...a11yProps(1)} />
    <Tab label="Podatek liniowy" {...a11yProps(2)} />
    <Tab label="Faktury" {...a11yProps(3)} />
  </Tabs>
)
export default TabPanelTabs;