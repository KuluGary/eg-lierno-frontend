import React from "react";
import clsx from "clsx";
import { Drawer, List, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Paper, Link } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountCircleIcon,
  MenuBook as MenuBookIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import useStyles from "./SecondaryNav.styles";

const items = [
  {
    to: "/characters",
    tag: "Personajes",
    Icon: AccountCircleIcon,
  },
  {
    to: "/campaigns",
    tag: "Partidas",
    Icon: MenuBookIcon,
  },
  {
    to: "/explore",
    tag: "Explorar",
    Icon: ExploreIcon,
  },
];

const BottomNavigation = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Paper className={classes.bottomBar} variant="outlined">
      <List className={classes.bottomBarList}>
        {items.map(({ to, tag, Icon }) => (
          <Link key={to} href={to} className={classes.link}>
            <ListItem button selected={router.pathname.includes(to)} className={classes.bottomBarListItem}>
              <ListItemIcon className={classes.bottomBarListIcon}>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={tag}
                className={classes.bottomBarListText}
                primaryTypographyProps={{
                  variant: "overline",
                }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
};

const SideNavigation = (props) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      <Drawer
        variant={"permanent"}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={props.handleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {items.map(({ to, tag, Icon }) => (
            <Link
              key={to}
              onClick={props.handleDrawer}
              to={to}
              className={classes.link}
            >
              <ListItem button selected={router.pathname.includes(to)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={tag} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export function SecondaryNav(props) {
  // if (breakpoints.down("sm")) {
  //   return <BottomNavigation />;
  // }

  return (
    <>
    <BottomNavigation />
    <SideNavigation {...props} />
    </>
  )
  // return <SideNavigation {...props} />;
}
