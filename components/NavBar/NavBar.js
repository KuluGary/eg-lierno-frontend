import { ChevronLeft as ChevronLeftIcon, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Link } from "components/Link/Link";
import { useWidth } from "hooks/useWidth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./Navbar.style";
import UserActions from "./UserActions/UserActions";

export function NavBar({ open, toggleDrawer, mode = "normal", containerRef = null, ...props }) {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const isMainScreen = router.pathname === "/";
  const [isIntersecting, setIsIntersecting] = useState(false);
  const theme = useTheme();
  const drawerWidth = 240;
  const navStyle = style({ theme, drawerWidth, isMainScreen, isIntersecting });
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
      <Toolbar sx={navStyle["toolbar"]}>
        <Box sx={navStyle["buttonContainer"]}>
          <Box sx={navStyle["skipLink"]} component={Link} href="#main-content" shallow={true}>
            Saltar al contenido
          </Box>
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
        </Box>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Lierno
        </Typography>
        <UserActions isMainScreen={isMainScreen} />
      </Toolbar>
    </AppBar>
  );
}
