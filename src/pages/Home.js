import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Grid, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import headshot from "../assets/DSC01852.jpg";

function Home() {
  return (
    <Box
      sx={{ p: 8, border: "1px dashed" }}
      margin={{ mobile: 5, lg: 20 }}
      color="primary"
    >
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ textAlign: "left", pb: 3 }}>
            hi there, I'm Ashley!
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            I'm a senior at Harvard studying Computer Science and Classics.
            Learn more about my work{" "}
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            sx={{
              maxWidth: { xs: 250, md: 250 },
              maxHeight: { xs: 500, md: 500 },
              border: "5px solid white",
            }}
            alt="Ashley Gong"
            src={headshot}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
