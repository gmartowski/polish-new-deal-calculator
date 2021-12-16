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
import Chart from "../../components/Chart/Chart";

const LumpSum = () => {

  const {
    annualSocialInsurance,
    annualRevenueNetto,
    annualTaxDeductibleExpenses,
  } = useSelector((state: RootState) => state.taxpayer);
  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);
  let formattedData = [];
  const presentData = () => {
    collectData();
    return Object.keys(formattedData).map((item: string, index: number) => (
      <TableRow key={index}>
        <TableCell>{formattedData[item].name}</TableCell>
        <TableCell>{formattedData[item].current}</TableCell>
        <TableCell>{formattedData[item].newDeal}</TableCell>
      </TableRow>
    ));
  };

  const collectData = () => {
    formattedData = [
      {
        name: 'PIT',
        current: annualSocialInsurance,
        newDeal: annualRevenueNetto - annualTaxDeductibleExpenses - annualSocialInsurance,
      },
      {
        name: 'ZUS',
        current: annualSocialInsurance,
        newDeal: annualSocialInsurance,
      },
      {
        name: 'Składka zdrowotna',
        current: annualSocialInsurance,
        newDeal: 381.81 * 12,

      },
      {
        name: 'Danina solidarnościowa',
        current: annualSocialInsurance,
        newDeal: 0,

      },
      {
        name: 'SUMA obciążeń***',
        current: annualSocialInsurance,
        newDeal: 0,

      }, {
        name: 'Efektywna stopa obciążeń',
        current: annualSocialInsurance,
        newDeal: 0,

      }, {
        name: 'Ile zostaje netto?',
        current: annualSocialInsurance,
        newDeal: 0,

      },
    ];
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ryczałt
                  <Tooltip title="od przychodów ewidencjonowanych (dostępny do 2 mln euro przychodów)">
                    <IconButton>
                      <InfoOutlinedIcon/>
                    </IconButton>
                  </Tooltip></TableCell>
                <TableCell>DZIŚ</TableCell>
                <TableCell>Po Polskim Ładzie</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {presentData()}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6}>
        <Chart chartData={formattedData} />
      </Grid>
    </Grid>
  );
};

export default LumpSum;
