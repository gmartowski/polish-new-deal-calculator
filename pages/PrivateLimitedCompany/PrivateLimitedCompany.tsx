import React from "react";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PrivateLimitedCompany = () => {

  const { revenueNetto, costsNetto, healthInsurance} = useSelector((state: RootState) => state.taxpayer);

  return (
    <Grid container spacing={2}>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Spółka z o.o.</TableCell>
              <TableCell>DZIŚ</TableCell>
              <TableCell>Po Polskim Ładzie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>PIT</TableCell>
              <TableCell></TableCell>
              <TableCell>{revenueNetto - costsNetto - healthInsurance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ZUS</TableCell>
              <TableCell>{healthInsurance}</TableCell>
              <TableCell>{healthInsurance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Składka zdrowotna</TableCell>
              <TableCell>{381.81 * 12}</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Danina solidarnościowa</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Suma obciążeń</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Efektywna stopa obciążeń</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ile zostaje netto ?</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default PrivateLimitedCompany;
