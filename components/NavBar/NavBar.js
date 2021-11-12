import React from "react";
import useStyles from "./NavBar.styles";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import clsx from "clsx";

export function NavBar({ open, handleDrawer, isAuthenticated }) {
  const classes = useStyles();

  return (
    <AppBar
      color={"primary"}
      position="sticky"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        {isAuthenticated && <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>}
        <div className={classes.flex}>
          <Typography variant="h6" noWrap>
            <Link to={"/"} className={classes.link}>
              Lierno
            </Link>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
