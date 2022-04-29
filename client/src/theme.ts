import { createTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
