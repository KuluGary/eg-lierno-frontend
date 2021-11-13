import { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "../Link/Link";
import { Menu as MenuIcon } from "@mui/icons-material";
import { signIn, signOut, useSession } from "next-auth/client";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useTheme } from '@mui/material/styles';

export function NavBar({ open, handleDrawer, ...props }) {
  const [session] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const drawerWidth = 240;

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <AppBar
      elevation={0}
      variant={"outlined"}
      position="sticky"
      open={props.open}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        color: "inherit",
        height: "100%",
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.background.paper',
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up("tablet")]: {
          "-webkit-backdrop-filter": "blur(20px)",
          backdropFilter: "blur(20px)",
          backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.3)",
        },
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        {session && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Lierno
        </Typography>
        {!!session ? (
          <IconButton onClick={handleMenu} color="inherit">
            <UserAvatar src={session.user.image} />
          </IconButton>
        ) : (
          <Link
            href={`/api/auth/signin`}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <Button variant="outlined">Entrar</Button>
          </Link>
        )}
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={menuOpen}
        onClose={handleClose}
      >
        <MenuItem>Mi cuenta</MenuItem>
        <MenuItem onClick={handleLogout}>
          <Link href={`/api/auth/signout`}>Salir</Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
