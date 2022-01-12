import {createTheme, Grid, List, ListItem, ListItemIcon, ListItemText, ThemeProvider} from "@material-ui/core";
import DoneIcon from '@mui/icons-material/Done';
import React from "react";

const Summarized = ({summarized}) => (
    <ThemeProvider
        theme={createTheme({
            palette: {
                primary: { main: 'rgb(102, 157, 246)' },
                secondary: { main: 'hsla(123, 46%, 34%, 1)', light: 'hsla(360, 91%, 50%, 1)' },
            },
        })}
    >
    <Grid container>
        <Grid item xs={12}>
            <List dense={false}>
                {
                    summarized.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <DoneIcon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                secondary={item.value}
                                primaryTypographyProps={{color: 'primary'}}
                            />
                        </ListItem>
                    ))
                }
            </List>
        </Grid>
    </Grid>
    </ThemeProvider>
);

export default Summarized;
