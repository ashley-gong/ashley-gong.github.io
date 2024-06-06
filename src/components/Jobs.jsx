import React from "react";
import Project from "./Project";
import { Link } from "@mui/material";

function Jobs() {
  return (
    <Project title="jobs">
      Summer 2024 Software Engineering Intern (GraphQL Infra Team) at{" "}
      <Link href="https://www.linkedin.com/">
        LinkedIn
      </Link>
      . Summer 2023 Cloud Security Change Management Technology Intern at{" "}
      <Link href="https://www.deloitte.com/global/en.html">
        Deloitte Global
      </Link>
      .{" "} 2023 {" "}  
      <Link href="https://csadvising.seas.harvard.edu/opportunities/patel/">
        Alex Patel Fellow
      </Link>{" "}
      for CS61: Systems Programming and Machine Organization. Summer 2022
      Research Fellow at{" "}
      <Link href="https://echeloninsights.com/">Echelon Insights</Link>. Peer
      Tutor for the{" "}
      <Link href="https://academicresourcecenter.harvard.edu/">
        Harvard Academic Resource Center
      </Link>
      . Digital Communications Intern for{" "}
      <Link href="https://college.harvard.edu/">
        Harvard College Communications
      </Link>
      .
    </Project>
  );
}

export default Jobs;
