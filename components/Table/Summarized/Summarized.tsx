import { Grid } from "@material-ui/core";
import React from "react";

const Summarized = ({ summarized }) => (
  <Grid container>
    <Grid item xs={12}>
      <div>{summarized.name}: <strong>{summarized.rate}</strong></div>
      <div>
        Ile stracisz / zyskasz na Polskim Ładzie ROCZNIE:
        <p style={{ color: summarized.annual > 0 ? "green" : 'red' }}>{summarized.annual} PLN</p>
      </div>
      <div>
        Ile stracisz / zyskasz na Polskim Ładzie Miesięcznie:
        <p style={{ color: summarized.monthly > 0 ? "green" : 'red' }}>{summarized.monthly} PLN</p>
      </div>
    </Grid>
  </Grid>
);

export default Summarized;
