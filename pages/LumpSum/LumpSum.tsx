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

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Chart from "../../components/Chart/Chart";

const LumpSum = ({data: {chart, table}}) => {

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
        <Chart chartData={chart}/>
      </Grid>
    </Grid>
  );
};

export default LumpSum;
