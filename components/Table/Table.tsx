import React from "react";
import {
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
import {Utils} from "../Utils/Utils";

const TableComponent = ({common, taxationTypeDetails, currency}) => {
  const presentData = () => {
    return Object.keys(common).map((item: string, index: number) => (
      <TableRow key={index}>
        <TableCell><strong>{common[item].name}</strong></TableCell>
        <TableCell>{Utils.convertToCurrency(common[item].previous, currency)}</TableCell>
        <TableCell>{Utils.convertToCurrency(common[item].newDeal, currency)}</TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>{taxationTypeDetails.name}</strong>
                <Tooltip title={taxationTypeDetails.info}>
                  <IconButton>
                    <InfoOutlinedIcon/>
                  </IconButton>
                </Tooltip></TableCell>
              <TableCell><strong>DZIŚ</strong></TableCell>
              <TableCell><strong>Po Polskim Ładzie</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{presentData()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
