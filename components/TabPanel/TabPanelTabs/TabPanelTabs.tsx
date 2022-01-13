import React from "react";
import { Tab, Tabs } from "@material-ui/core";
import { a11yProps } from "../A11YProps";

const TabPanelTabs = ({ value, handleChange, tabs }) => {
  const handler = (e, f) => {
    handleChange(f)
  }

  return (
    <Tabs value={value} onChange={handler} aria-label="basic tabs example">
      {
        tabs.map((item) => (
          <Tab label={item.value} key={item.index} {...a11yProps(item.index)} />
        ))
      }
    </Tabs>
  )
}
export default TabPanelTabs;