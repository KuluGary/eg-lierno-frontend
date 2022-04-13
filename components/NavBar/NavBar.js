import { useState, useEffect } from "react";
import { AppBar, IconButton, Toolbar, Typography, Button, Menu, MenuItem, Container } from "@mui/material";
import { Link } from "../Link/Link";
import { Menu as MenuIcon } from "@mui/icons-material";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar } from "../";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { StringUtil } from "helpers/string-util";

export function NavBar({ open, handleDrawer, mode = "normal", containerRef = null, ...props }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMainScreen = router.pathname === "/";
  const [isIntersecting, setIsIntersecting] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const drawerWidth = 240;

  useEffect(() => {
    if (isMainScreen) {
      const observer = new IntersectionObserver(
        (entries, sectionObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              setIsIntersecting(true);
            } else {
              setIsIntersecting(false);
            }
          });
        },
        { rootMargin: "-200px 0px 0px 0px" }
      );

      if (containerRef?.current) observer.observe(containerRef.current);
      return () => {
        if (containerRef?.current) observer.unobserve(containerRef.current);
      };
    }
  }, [containerRef]);

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
      position={isMainScreen ? "fixed" : "sticky"}
      open={props.open}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        color: "inherit",
        height: "100%",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up("tablet")]: {
          WebkitBackdropFilter: "blur(20px)",
          backdropFilter: "blur(20px)",
          backgroundColor: theme.palette.background.body,
          ...(isMainScreen && {
            WebkitBackdropFilter: "none",
            backdropFilter: "none",
            height: "auto",
            background: "transparent",
            color: "primary.contrastText",
            border: "none",
            transition: theme.transitions.create(["background-color", "color"], {
              duration: theme.transitions.duration.standard,
            }),
            ...(isIntersecting && {
              background: theme.palette.background.body,
              borderBottom: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
            }),
          }),
        },
        ...(open && {
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
        {session && !isMainScreen && (
          <IconButton
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
        {isMainScreen && !!session && (
          <Link
            href="/characters"
            sx={{
              mr: 6,
              color: "inherit",
              textDecoration: "none",
              "&:hover": { color: (t) => t.palette.secondary.main },
            }}
          >
            Ir al Panel
          </Link>
        )}
        {!!session ? (
          <>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={session?.picture} fallBackText={StringUtil.getInitials(session?.name || "")} />
            </IconButton>
          </>
        ) : (
          <Link
            href={`/api/auth/signin`}
            sx={{ textDecoration: "none" }}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <Button variant="outlined" color={!isMainScreen ? "primary" : "inherit"}>
              Entrar
            </Button>
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
        <MenuItem disabled>Mi cuenta</MenuItem>
        <MenuItem onClick={handleLogout}>
          <Link href={`/api/auth/signout`}>Salir</Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
