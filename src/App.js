import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import Home from "./pages/Home";
import MyStuff from "./pages/MyStuff";
import { Grid, ThemeProvider, createTheme, Link } from "@mui/material";


const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 500,
      tablet: 950,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: "#634e75",
    },
    secondary: {
      main: "#261d3b",
    },
    success: {
      main: "#93a262",
    },
  },
  typography: {
    fontFamily: "Andale Mono",
    h3: {
      paddingBottom: 8,
      color: "#261d3b",
      fontFamily: "Montserrat",
    },
    h4: {
      fontFamily: "Montserrat",
    },
    h6: {
      color: "#634e75",
    },
    body1: {
      color: "#634e75",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "Andale Mono",
          textDecoration: "none",
          fontWeight: "bold",
          "&:hover": {
            color: "#c986cc",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={appTheme}>
          <Grid container spacing={6} sx={{ padding: 4, ml: 10 }}>
            <Grid item>
              <Link component={RouterLink} to="/" variant="h6">
                home
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/mystuff" variant="h6">
                my stuff
              </Link>
            </Grid>
          </Grid>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mystuff" element={<MyStuff />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
