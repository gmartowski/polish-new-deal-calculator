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

const ProgressiveTax = () => {

  const {
    annualRevenueNetto,
    annualTaxDeductibleExpenses,
    annualSocialInsurance,
  } = useSelector((state: RootState) => state.taxpayer);

  let formattedData = [];

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);

  const calculateRelief = (): number => {
    let avgIncome = Number(annualAverageIncome);
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

  const calculateannualSocialInsurance = () => {
    if ((annualAverageIncome - annualSocialInsurance) * 0.09 > 3250.8) {
      return (annualAverageIncome - annualSocialInsurance) * 0.09;
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
  const presentData = () => {
    collectData();
    return Object.keys(formattedData).map((item: string, index: number) => (
      <TableRow key={index}>
        <TableCell>{formattedData[item].name}</TableCell>
        <TableCell>{formattedData[item].newDeal}</TableCell>
      </TableRow>
    ));
  };

  const collectData = () => {
    formattedData = [
      {
        name: 'ulga dla klasy średniej',
        newDeal: calculateRelief(),
      },
      {
        name: 'podstawa opodatkowania po uldze',
        newDeal: taxationBase - calculateRelief(),
      },
      {
        name: 'PIT',
        newDeal: calculatePIT(),
      },
      {
        name: 'ZUS',
        newDeal: annualSocialInsurance,
      },
      {
        name: 'Składka zdrowotna',
        newDeal: calculateannualSocialInsurance(),

      },
      {
        name: 'Danina solidarnościowa',
        newDeal: calculateSolidarity(),

      },
      {
        name: 'SUMA obciążeń***',
        newDeal: calculatePIT() + annualSocialInsurance + calculateannualSocialInsurance() + calculateSolidarity(),

      }, {
        name: 'Efektywna stopa obciążeń',
        newDeal: taxationBase === 0 ? "n/d" : `${Math.round((calculatePIT() + annualSocialInsurance + calculateannualSocialInsurance() + calculateSolidarity()) / annualAverageIncome * 100)} %`,

      }, {
        name: 'Ile zostaje netto?',
        newDeal: annualAverageIncome - (calculatePIT() + annualSocialInsurance + calculateannualSocialInsurance() + calculateSolidarity()),

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

export default ProgressiveTax;
