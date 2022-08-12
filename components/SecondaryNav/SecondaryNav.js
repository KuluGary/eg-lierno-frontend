import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Paper, Link, Drawer } from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  MenuBook as MenuBookIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";
import { useWidth } from "../../hooks/useWidth";
import { useSession } from "next-auth/react";

const categories = [
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
        display: "block",
      }}
    >
      <List sx={{ display: "flex", width: "100vw", justifyContent: "space-evenly", paddingTop: 0 }}>
        {categories.map(({ to, tag, Icon }) => (
          <Link
            key={to}
            href={to}
            sx={{
              textDecoration: "none",
              color: (t) => t.palette.background.contrastText,
              width: "100%",

              flexBasis: "100%",
              flexGrow: 1,
            }}
          >
            <ListItem
              button
              selected={router.pathname.includes(to)}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
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

const SideNavigation = ({ open }) => {
  const theme = useTheme();
  const router = useRouter();
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        elevation: 0,
        sx: {
          background: "none",
          backgroundColor: theme.palette.background.body,
        },
      }}
      sx={{
        background: "none",
        backgroundColor: theme.palette.background.body,
        "& .MuiDrawer-paper": {
          background: "none",
          backgroundColor: theme.palette.background.body,
          height: "100%",
          position: "relative",
          whiteSpace: "nowrap",
          border: "none",
          width: drawerWidth,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: "border-box",
          ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
              width: theme.spacing(9),
            },
          }),
        },
      }}
    >
      <List sx={{ overflowX: "hidden" }}>
        {categories.map(({ to, tag, Icon }) => (
          <Link key={to} href={to} sx={{ textDecoration: "none", color: theme.palette.background.contrastText }}>
            <ListItem
              button
              selected={router.pathname.includes(to)}
              sx={{ borderTopRightRadius: "12px", borderBottomRightRadius: "12px" }}
            >
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
    </Drawer>
  );
};

export function SecondaryNav(props) {
  const width = useWidth();
  const { status } = useSession();

  if (status !== "authenticated") return <React.Fragment />;

  if (width.down("tablet")) return <BottomNavigation {...props} />;

  return <SideNavigation {...props} />;
}
