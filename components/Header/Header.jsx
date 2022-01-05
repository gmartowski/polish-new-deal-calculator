import React from 'react';
import { Grid, makeStyles, Typography } from "@material-ui/core";
import ResponsiveAppBar from "../Navbar/Navbar";

const useStyles = makeStyles({
    headerStyles: {
        padding: '10px 30px 30px 30px',
        marginBottom: '20px'
    }
})

const Header = () => {
    const classes = useStyles();

    return (
        <header>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <ResponsiveAppBar/>
                </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.headerStyles}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Symulacja obciążeń podatkowych przedsiębiorcy po wejściu w życie Polskiego Ładu.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">
                        Kalkulator oparty na Polskim Ładzie uchwalonym 29.10.2021*
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">
                        UWAGA - wypełnij tylko pola zaznaczone na bladorożowo (nie zmieniaj pola B11, jeśli dotyczy
                        Cię standardowy ZUS) oraz żółto (pola na żółto są opcjonalne).
                    </Typography>
                </Grid>
            </Grid>
        </header>
    )
};

export default Header;
