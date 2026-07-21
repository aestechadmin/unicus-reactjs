import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: '#FFF'
    },
    secondary: {
      main: "#027EFF",
      light: "#66B2FF"
    },
    tertiary: {
      main: "#F5F4DE",
      light: "#E8DEF8"
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    textAlign: 'left',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600, // SemiBold
    h1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '19px',
      letterSpacing: '0%',
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0%',
      textAlign: 'center',
    },
    button: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0%',
      textTransform: 'none',
    },
  },
});

export default theme;