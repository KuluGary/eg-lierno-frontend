import React from "react";
import { Box } from "@mui/material";
import useStyles from "./Layout.styles";

export function Layout({ children }) {
  const classes = useStyles();

  return <Box className={classes.root}>{children}</Box>;
}
