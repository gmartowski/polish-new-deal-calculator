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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SimplePieChart from "../../components/PieChart/SimplePieChart";

const FlatTax = () => {

  const taxRate = 0.19;
  const healthInsuranceRate = 0.049;
  const minimalHealthInsuranceQuota = 3250.8;
  const monthsInYear = 12;
  const monthlyHealthInsurance = 381.81;
  const monthlyHealthInsuranceDepreciation = 328.78;
  const solidarityTributeThreshold = 1000000;
  const solidarityTributeTaxRate = 0.04;
  let formattedData = [];
  let newDealFormattedData = [];
  let nonewDealFormattedData = [];
  const details = {
    newDealPIT: 0,
    currentPIT: 0,
    annualHealthInsurance: 0,
    newDealAnnualHealthInsurance: 0,
    solidarityTribute: 0,
    taxBurdenSum: 0,
    newDealTaxBurdenSum: 0,
    effectiveNewDealTaxBurden: 0,
    nettoSalary: 0,
    newDealNettoSalary: 0,
  };

  const [flatTaxDetails, setFlatTaxDetails] = React.useState(details);

  const {
    annualRevenueNetto,
    annualTaxDeductibleExpenses,
    annualSocialInsurance,
  } = useSelector((state: RootState) => state.taxpayer);
  const dispatch = useDispatch();

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);


  const newDealPIT = (): number => {
    return ((annualRevenueNetto - annualTaxDeductibleExpenses - annualSocialInsurance) * taxRate);
  };

  const currentPIT = (): number => {
    return newDealPIT() - (monthsInYear * monthlyHealthInsuranceDepreciation);
  };

  const annualHealthInsurance = (): number => {
    return monthlyHealthInsurance * monthsInYear;
  };

  const newDealAnnualHealthInsurance = (): number => {
    const newDealHealthInsuranceQuota = (annualAverageIncome - annualSocialInsurance) * healthInsuranceRate;
    return newDealHealthInsuranceQuota > minimalHealthInsuranceQuota ? newDealHealthInsuranceQuota : minimalHealthInsuranceQuota;
  };

  const solidarityTribute = (): number => {
    return taxationBase > solidarityTributeThreshold ? (taxationBase - solidarityTributeThreshold) * solidarityTributeTaxRate : 0;
  };

  const taxBurdenSum = (): number => {
    return currentPIT() + annualSocialInsurance + annualHealthInsurance() + solidarityTribute();
  };

  const newDealTaxBurdenSum = (): number => {
    return newDealPIT() + annualSocialInsurance + newDealAnnualHealthInsurance() + solidarityTribute();
  };

  const effectiveTaxBurden = (): number => {
    return (currentPIT() + annualSocialInsurance + annualHealthInsurance() + solidarityTribute()) / annualAverageIncome;
  };

  const effectiveNewDealTaxBurden = (): number => {
    return (newDealPIT() + annualSocialInsurance + newDealAnnualHealthInsurance() + solidarityTribute()) / annualAverageIncome;
  };

  const nettoSalary = (): number => {
    return annualAverageIncome - (currentPIT() + annualSocialInsurance + annualHealthInsurance() + solidarityTribute());
  };

  const newDealNettoSalary = (): number => {
    return annualAverageIncome - (newDealPIT() + annualSocialInsurance + newDealAnnualHealthInsurance() + solidarityTribute());
  };

  const convertionHOC = (prop: () => number): number => {
    return Math.round(Number(prop()));
  };

  const roundHOC = (prop: () => number): string => {
    return `${Math.round(Number(prop()) * 100)} %`;
  };

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
        newDeal: convertionHOC(newDealPIT),
        current: convertionHOC(currentPIT),
      },
      {
        name: 'ZUS',
        newDeal: annualSocialInsurance,
        current: annualSocialInsurance,
      },
      {
        name: 'Składka zdrowotna',
        newDeal: convertionHOC(newDealAnnualHealthInsurance),
        current: convertionHOC(annualHealthInsurance),
      },
      {
        name: 'Danina solidarnościowa',
        newDeal: convertionHOC(solidarityTribute),
        current: convertionHOC(solidarityTribute),
      },
      {
        name: 'Suma obciążeń',
        newDeal: convertionHOC(newDealTaxBurdenSum),
        current: convertionHOC(taxBurdenSum),
      },
      {
        name: 'Efektywna stopa obciążeń',
        newDeal: roundHOC(effectiveNewDealTaxBurden),
        current: roundHOC(effectiveTaxBurden),
      },
      {
        name: 'Ile zostaje netto ?',
        newDeal: convertionHOC(newDealNettoSalary),
        current: convertionHOC(nettoSalary),
      },
    ];

    nonewDealFormattedData = [
      {
        name: 'PIT',
        value: convertionHOC(currentPIT),
      },
      {
        name: 'ZUS',
        value: annualSocialInsurance,
      },
      {
        name: 'Składka zdrowotna',

        value: convertionHOC(annualHealthInsurance),
      },
      {
        name: 'Danina solidarnościowa',

        value: convertionHOC(solidarityTribute),
      },
      {
        name: 'Suma obciążeń',

        value: convertionHOC(taxBurdenSum),
      },
      {
        name: 'Efektywna stopa obciążeń',

        value: roundHOC(effectiveTaxBurden),
      },
      {
        name: 'Ile zostaje netto ?',

        value: convertionHOC(nettoSalary),
      },
    ];

    newDealFormattedData = [
      {
        name: 'PIT',
        value: convertionHOC(newDealPIT),

      },
      {
        name: 'ZUS',
        value: annualSocialInsurance,

      },
      {
        name: 'Składka zdrowotna',
        value: convertionHOC(newDealAnnualHealthInsurance),

      },
      {
        name: 'Danina solidarnościowa',
        value: convertionHOC(solidarityTribute),

      },
      {
        name: 'Suma obciążeń',
        value: convertionHOC(newDealTaxBurdenSum),

      },
      {
        name: 'Efektywna stopa obciążeń',
        value: roundHOC(effectiveNewDealTaxBurden),

      },
      {
        name: 'Ile zostaje netto ?',
        value: convertionHOC(newDealNettoSalary),

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
                <TableCell>
                  Podatek liniowy
                  <Tooltip title="19 %">
                    <IconButton>
                      <InfoOutlinedIcon/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>2021</TableCell>
                <TableCell>Polski Ład</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {presentData()}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6}>
        <SimplePieChart data={newDealFormattedData}/>
        <SimplePieChart data={nonewDealFormattedData}/>
      </Grid>
    </Grid>
  );
};


export default FlatTax;
