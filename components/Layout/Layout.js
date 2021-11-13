import React from "react";
import { Box } from "@mui/material";

export function Layout({ children }) {

  return <Box component="main" sx={{ height: "100%", mb: { mobile: "175px", laptop: "100px" } }}>{children}</Box>;
}
