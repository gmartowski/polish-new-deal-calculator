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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SimplePieChart from "../../components/PieChart/SimplePieChart";

const FlatTax = ({data: {chart, table}}) => {

  const presentData = () => {
    return Object.keys(table).map((item: string, index: number) => (
      <TableRow key={index}>
        <TableCell>{table[item].name}</TableCell>
        <TableCell>{table[item].current}</TableCell>
        <TableCell>{table[item].newDeal}</TableCell>
      </TableRow>
    ));
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
        <SimplePieChart data={chart}/>
      </Grid>
    </Grid>
  );
};


export default FlatTax;
