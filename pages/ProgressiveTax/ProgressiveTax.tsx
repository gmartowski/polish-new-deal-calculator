import React from "react";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ProgressiveTax = () => {

  const {
    revenueNetto,
    costsNetto,
    healthInsurance,
  } = useSelector((state: RootState) => state.taxpayer);

  const averageIncome = revenueNetto - costsNetto;
  const taxationBase = averageIncome - healthInsurance;

  const calculateRelief = (): number => {
    let avgIncome = Number(averageIncome);
    if (avgIncome > 133692) {
      return 0;
    }

    if (avgIncome > 102588) {
      return Math.round((avgIncome * (-0.0735) + 9829) / 0.17);
    }

    if (avgIncome >= 68412) {
      return Math.round(((avgIncome * 0.0668) - 4566) / 0.17);
    }

    return 0;
  };

  const calculateHealthInsurance = () => {
    if ((averageIncome - healthInsurance) * 0.09 > 3250.8) {
      return (averageIncome - healthInsurance) * 0.09;
    }

    return 3250.8;
  };

  const calculateSolidarity = () => {
    if (taxationBase > 1000000) {
      return (taxationBase - 1000000) * 0.04;
    }

    return 0;
  };

  const calculatePIT = () => {
    const baseAfterRelief = taxationBase - calculateRelief();
    if (baseAfterRelief > 0) {
      if (baseAfterRelief > 120000) {
        if ((120000 * 0.17 + (baseAfterRelief - 120000 * 0.32) - 5100) < 0) {
          return 0;
        } else {
          return 120000 * 0.17 + (baseAfterRelief - 120000 * 0.32) - 5100;
        }
      } else {
        return baseAfterRelief * 0.17 - 5100;
      }
    }
  };

  return (
    <Grid container spacing={2}>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Skala podatkowa
                <Tooltip title="po Polskim Ładzie - z uwzględnieniem ulgi dla klasy średniej">
                  <IconButton>
                    <InfoOutlinedIcon/>
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>Po Polskim Ładzie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ulga dla klasy średniej</TableCell>
              <TableCell>{calculateRelief()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>podstawa opodatkowania po uldze</TableCell>
              <TableCell>{taxationBase - calculateRelief()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PIT</TableCell>
              <TableCell>{calculatePIT()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ZUS</TableCell>
              <TableCell>{healthInsurance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Składka zdrowotna</TableCell>
              <TableCell>{calculateHealthInsurance()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Danina solidarnościowa</TableCell>
              <TableCell>{calculateSolidarity()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SUMA obciążeń***</TableCell>
              <TableCell>{calculatePIT() + healthInsurance + calculateHealthInsurance() + calculateSolidarity()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Efektywna stopa obciążeń</TableCell>
              <TableCell>{taxationBase === 0 ? "n/d" : `${Math.round((calculatePIT() + healthInsurance + calculateHealthInsurance() + calculateSolidarity()) / averageIncome * 100)} %`} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ile zostaje netto?</TableCell>
              <TableCell>{averageIncome - (calculatePIT() + healthInsurance + calculateHealthInsurance() + calculateSolidarity())}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default ProgressiveTax;
