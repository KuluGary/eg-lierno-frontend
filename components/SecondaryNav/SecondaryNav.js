import React from "react";
import clsx from "clsx";
import { List, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Paper, Link, Toolbar } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountCircleIcon,
  MenuBook as MenuBookIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { Drawer } from "./SecondaryNav.styles";

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
  const router = useRouter();

  return (
    <Paper
      variant="outlined"
      sx={{
        position: "fixed",
        bottom: 0,
        zIndex: 100,
        width: "100vw",
        borderRadius: 0,
        height: 80,
        display: {
          mobile: "block",
          laptop: "none"
        }
      }}
    >
      <List>
        {items.map(({ to, tag, Icon }) => (
          <Link key={to} href={to}>
            <ListItem button selected={router.pathname.includes(to)}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={tag}
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
  const router = useRouter();

  return (
    <Drawer open={props.open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={props.handleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {items.map(({ to, tag, Icon }) => (
          <Link key={to} onClick={props.handleDrawer} to={to}>
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
  );
};

export function SecondaryNav(props) {
  return (
    <>
      <BottomNavigation />
      <SideNavigation {...props} />
    </>
  );
}
