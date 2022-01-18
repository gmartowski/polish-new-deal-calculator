import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const DescriptionList = ({ items: { records, title } }) => (
  <>
    <Typography variant="h6" component="div">{title}</Typography>
    <List>
      {
        Object.keys(records).map((item: string, index: number) => (
          <ListItem key={index}>
            <ListItemIcon style={{ color: records[item].isNegative ? "red" : "green" }}>
              {records[item].isNegative ? <SentimentVeryDissatisfiedIcon/> : <SentimentSatisfiedAltIcon/>}
            </ListItemIcon>
            <ListItemText
              primary={records[item].primary}
              secondary={records[item].secondary}
            />
          </ListItem>
        ))
      }
    </List>
  </>
)

export default DescriptionList;