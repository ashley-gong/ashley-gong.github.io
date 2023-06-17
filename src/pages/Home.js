import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Grid, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  return (
    // <div>
    <Box
      sx={{ p: 10, border: "1px dashed" }}
      margin={{ xs: 5, lg: 20 }}
      color="primary"
    >
      <Typography variant="h3" sx={{ textAlign: "left", pb: 3 }}>
        hey, I'm Ashley!
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "left" }}>
        I'm a junior at Harvard studying Computer Science and Classics. Learn
        more about my work{" "}
        <Link component={RouterLink} to="/mystuff" variant="h6">
          here
        </Link>
        !
      </Typography>
      <Grid container columnSpacing={2} pt={4}>
        <Grid item>
          <IconButton
            aria-label="github"
            onClick={() => window.open("https://github.com/ashley-gong")}
          >
            <GitHubIcon color="primary" fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="linkedin"
            onClick={() =>
              window.open("https://www.linkedin.com/in/ashley-gong-03/")
            }
          >
            <LinkedInIcon color="primary" fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body1" sx={{ textAlign: "left", pt: 2 }}>
        ashleygong@college.harvard.edu
      </Typography>
    </Box>
    // </div>
  );
}

export default Home;
