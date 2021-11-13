import { styled } from "@mui/styles";
import { AppBar as MuiAppBar } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: "inherit",
  height: "100%",
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.background.paper,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up("tablet")]: {
    "-webkit-backdrop-filter": "blur(20px)",
    backdropFilter: "blur(20px)",
    backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.3)"
  },
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export { AppBar };