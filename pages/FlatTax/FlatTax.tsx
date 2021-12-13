import React from "react";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const FlatTax = (props) => {

  // const [summary, setSummary] = useState({
  //   pit: 0,
  //   pitNewDeal: 0,
  //   zus: 0,
  //   zusNewDeal: 0,
  //   healthInsuranceOld: 0,
  //   healthInsuranceNewDeal: 0,
  //   solidarity: 0,
  // });

  const {
    revenueNetto,
    costsNetto,
    healthInsurance,
  } = useSelector((state: RootState) => state.taxpayer);

  const averageIncome = revenueNetto - costsNetto;
  const taxationBase = averageIncome - healthInsurance;

  const calculateNewDealPIT = () => {
    return Math.round((revenueNetto - costsNetto - healthInsurance) * 0.19);
  };

  const calculatePIT = () => {
    return Math.round((revenueNetto - costsNetto - healthInsurance) * 0.19) - (12 * 328.78);
  };

  const calculateHealthInsurance = () => {
    return 381.81 * 12;
  };

  const calculateNewDealHealthInsurance = () => {
    return Math.round((averageIncome - healthInsurance) * 0.049) > 3250.8 ? Math.round((averageIncome - healthInsurance) * 0.049) : 3250.8;
  };

  const calculateSolidarityCost = () => {
    return taxationBase > 1000000 ? (taxationBase - 1000000) * 0.04 : 0;
  };

  return (
    <Grid container spacing={2}>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>JDG - Podatek liniowy 19%</TableCell>
              <TableCell>DZIŚ</TableCell>
              <TableCell>Po Polskim Ładzie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>PIT</TableCell>
              <TableCell>{calculatePIT()} PLN</TableCell>
              <TableCell>{calculateNewDealPIT()} PLN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ZUS</TableCell>
              <TableCell>{Math.round(healthInsurance)} PLN</TableCell>
              <TableCell>{Math.round(healthInsurance)} PLN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Składka zdrowotna</TableCell>
              <TableCell>{calculateHealthInsurance()} PLN</TableCell>
              <TableCell>{calculateNewDealHealthInsurance()} PLN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Danina solidarnościowa</TableCell>
              <TableCell>{calculateSolidarityCost()} PLN</TableCell>
              <TableCell>{calculateSolidarityCost()} PLN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Suma obciążeń</TableCell>
              <TableCell>{calculatePIT() + healthInsurance + calculateHealthInsurance() + calculateSolidarityCost()} PLN</TableCell>
              <TableCell>{calculateNewDealPIT() + healthInsurance + calculateNewDealHealthInsurance() + calculateSolidarityCost()} PLN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Efektywna stopa obciążeń</TableCell>
              <TableCell>{Math.round((calculatePIT() + healthInsurance + calculateHealthInsurance() + calculateSolidarityCost()) / averageIncome)} PLN</TableCell>
              <TableCell>{Math.round((calculateNewDealPIT() + healthInsurance + calculateNewDealHealthInsurance() + calculateSolidarityCost()) / averageIncome)} PLN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ile zostaje netto ?</TableCell>
              <TableCell>{averageIncome - (calculatePIT() + healthInsurance + calculateHealthInsurance() + calculateSolidarityCost())} PLN</TableCell>
              <TableCell>{averageIncome - (calculateNewDealPIT() + healthInsurance + calculateNewDealHealthInsurance() + calculateSolidarityCost())} PLN</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};


export default FlatTax;
