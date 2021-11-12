import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      fontWeight: 700
    }
  }
});

export default theme;