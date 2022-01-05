import { AppBar, Avatar, Box, Container, IconButton, Menu, Toolbar, Tooltip, Typography } from '@material-ui/core';
import * as React from 'react';

const ResponsiveAppBar = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            Kalkulator - Polski Lad
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton>
                <Avatar alt="Remy Sharp" src="https://images-na.ssl-images-amazon.com/images/G/01/audiblemobile/store/image/favicons/icons310px.png"/>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
