import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useWidth } from "hooks/useWidth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserActions from "./UserActions";

const navBarSytle = ({ theme, drawerWidth, open, isMainScreen, isIntersecting }) => ({
  mainScreen: {
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
  },
  default: {
    height: "60px",
    background: "none",
    backgroundColor: theme.palette.background.body,
    color: "text.primary",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
});

export function NavBar({ open, toggleDrawer, mode = "normal", containerRef = null, ...props }) {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const isMainScreen = router.pathname === "/";
  const [isIntersecting, setIsIntersecting] = useState(false);
  const theme = useTheme();
  const drawerWidth = 240;
  const navStyle = navBarSytle({ theme, drawerWidth, isMainScreen, isIntersecting });
  const width = useWidth();

  useEffect(() => {
    if (isMainScreen) {
      const observer = new IntersectionObserver(
        (entries) => {
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

  return (
    <AppBar
      elevation={0}
      position={isMainScreen ? "fixed" : "sticky"}
      open={props.open}
      sx={navStyle[isMainScreen ? "mainScreen" : "default"]}
    >
      <Toolbar sx={{ pr: "24px" }}>
        {sessionStatus === "authenticated" && !isMainScreen && width.up("tablet") && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        )}
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Lierno
        </Typography>
        <UserActions isMainScreen={isMainScreen} />
      </Toolbar>
    </AppBar>
  );
}
