import { useState, useContext } from "react";
import {
  Typography,
  Box,
  Paper,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountCircleIcon,
  MenuBook as MenuBookIcon,
  Explore as ExploreIcon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { signIn, signOut, useSession } from "next-auth/client";
import { Link } from "components/Link/Link";
import { Avatar } from "../";
import ColorModeContext from "helpers/color-context";

const list = [
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

export function Layout({ children }) {
  const [session] = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const drawerWidth = 240;
  const isMainScreen = router.pathname === "/";
  const colorMode = useContext(ColorModeContext);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      {/* Top navigation bar */}
      <MuiAppBar
        position={isMainScreen ? "absolute" : "sticky"}
        open={open}
        sx={{
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
        }}
      >
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
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
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Lierno
          </Typography>
          <Box component="div">
            <IconButton onClick={colorMode.toggleColorMode}>
              <svg
                style={{
                  width: "24px",
                  height: "24px",
                  fill: theme.palette.grey["500"],
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="472.39"
                height="472.39"
                viewBox="0 0 472.39 472.39"
              >
                <g
                  style={{
                    transformOrigin: "center center",
                    transition: "transform 750ms cubic-bezier(0.11, 0.14, 0.29, 1.32)",
                    transform: theme.palette.mode === "light" ? "rotate(0.5turn)" : "",
                  }}
                >
                  <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
                </g>
                <g
                  style={{
                    transition: "transform 500ms ease-out",
                    transform: theme.palette.mode === "light" ? "translateX(-15%)" : "",
                  }}
                >
                  <circle cx="236.2" cy="236.2" r="103.78" />
                </g>
              </svg>
            </IconButton>
            {!!session ? (
              <IconButton onClick={handleMenu} color="inherit">
                <Avatar src={session?.image} />
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
          </Box>
        </Toolbar>
      </MuiAppBar>

      <Box sx={{ display: "flex", alignItems: "stretch", height: "calc(100vh - 60px)", outline: "1px solid red" }}>
        {/* Side navigation bar */}
        <MuiDrawer
          variant="permanent"
          open={open}
          PaperProps={{
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
            {list.map(({ to, tag, Icon }) => (
              <Link key={to} href={to}>
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
        </MuiDrawer>

        {/* Content body */}
        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.background.body,
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box
            component="div"
            sx={{
              backgroundColor: theme.palette.background.container,
              height: "100%",
              width: "97%",
              borderRadius: "12px 12px 0px 0px",
              p: "1em",
              overflow: "auto",
              ...theme.mixins.noScrollbar /* Firefox */,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>

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
    </>
  );
}
