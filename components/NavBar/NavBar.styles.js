import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: "inherit",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 60,
    [theme.breakpoints.up("sm")]: {
      "-webkit-backdrop-filter": "blur(20px)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxShadow: "none",
      backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.3)"
    }
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  goBackButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  flex: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: "50%",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default useStyles;
