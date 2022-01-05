import { createTheme } from "@material-ui/core";

const lightMode = createTheme({
  typography: {
    fontFamily: [
      "'Montserrat'",
      "sans-serif",
    ].join(','),
  },
});

export default lightMode;
