import { Link, Typography } from "@mui/material";
import React from "react";

function CodingItem({ title, link, children }) {
  return (
    <Typography variant="body1" sx={{ pb: 3 }}>
      {link !== "" ? (
        <Link href={link} variant="h6" color="secondary">
          {title}
        </Link>
      ) : (
        <Typography
          variant="h6"
          color="secondary"
          display="inline"
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
      )}{" "}
      • {children}
    </Typography>
  );
}

export default CodingItem;
