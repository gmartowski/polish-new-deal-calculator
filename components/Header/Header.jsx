import React from 'react';
import { Grid, Typography } from "@material-ui/core";

const Header = () => (
    <header>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    Symulacja obciążeń podatkowych przedsiębiorcy po wejściu w życie Polskiego Ładu - wersja 2.0
                </Typography>
                <Typography>Kalkulator oparty na Polskim Ładzie uchwalonym 29.10.2021*</Typography>
                <Typography>Więcej informacji o podatkach i Polskim Ładzie w naszym podcastowym
                    newsletterze:</Typography>
                <Typography>UWAGA - wypełnij tylko pola zaznaczone na bladorożowo (nie zmieniaj pola B11, jeśli dotyczy
                    Cię standardowy ZUS) oraz żółto (pola na żółto są opcjonalne)</Typography>
            </Grid>
        </Grid>
    </header>
);

export default Header;
