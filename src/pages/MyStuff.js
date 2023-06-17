import { Box, Link, Typography } from "@mui/material";
import React from "react";
import Project from "../components/Project";
import Jobs from "../components/Jobs";
import Coding from "../components/Coding";
import Music from "../components/Music";

function MyStuff() {
  return (
    <div>
      <Box margin={{ xs: "40px 40px 40px 40px", lg: "50px 160px 160px 160px" }}>
        <Typography variant="body1" sx={{ textAlign: "left", pb: 4 }}>
          Here are a few things I'm currently doing or have worked on! Scroll
          for music :{")"}
        </Typography>
        <Jobs />
        <Project title="research (cs + classics)">
          Working on Latin and Greek vocabulary acquisition using digital
          humanities with Dr. Ivy Livingston and Harvard IT for{" "}
          <Link href="https://hederaproject.org/">The Hedera Project</Link>.
          Starting ontology extraction research with Dr. Mark Schiefsky and Dr.
          Saïd Esteban Belmehdi at the{" "}
          <Link href="https://chs.harvard.edu/">
            Center for Hellenic Studies
          </Link>
          .
        </Project>
        <Coding />
        <Music />
      </Box>
    </div>
  );
}

export default MyStuff;
