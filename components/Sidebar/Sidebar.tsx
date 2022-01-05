import React from 'react';
import { Drawer, makeStyles, Typography } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles({
  page: {
    background: '#f9f9f9',
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{ paper: classes.drawerPaper }}>
      <div>
        <Typography variant={'h5'}>
          teststststst
        </Typography>
      </div>
    </Drawer>
  );
};

export default Sidebar;
