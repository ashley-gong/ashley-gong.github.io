import { Typography } from "@mui/material";
import React from "react";

function Project({ title, children }) {
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "left", pb: 3 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "left", pb: 4 }}>
        {children}
      </Typography>
    </div>
  );
}

export default Project;
