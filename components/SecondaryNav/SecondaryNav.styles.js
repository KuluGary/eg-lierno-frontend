import { styled } from "@mui/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Paper } from "@mui/material";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      },
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const BottomContainer = styled(Paper, { shouldForwardProp: false })(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  zIndex: 100,
  width: "100vw",
  borderRadius: 0,
  height: 80,
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export { Drawer, BottomContainer };
//export default useStyles;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     [theme.breakpoints.down("sm")]: {
//       display: "none",
//     },
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   hide: {
//     display: "none",
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//   },
//   drawerOpen: {
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerClose: {
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: "hidden",
//     width: theme.spacing(7) + 1,
//     [theme.breakpoints.up("xs")]: {
//       width: theme.spacing(0),
//     },
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing(9) + 1,
//     },
//   },
//   toolbar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   link: {
//     color: "inherit",
//     textDecoration: "none",
//   },
//   bottomBar: {
//     position: "fixed",
//     bottom: 0,
//     zIndex: 100,
//     width: "100vw",
//     borderRadius: 0,
//     height: 80,
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   bottomBarList: {
//     display: "grid",
//     gridAutoFlow: "column",
//     gridAutoColumns: "1fr",
//     padding: 0,
//   },
//   bottomBarListItem: {
//     flex: 1,
//     flexBasis: "100%",
//     flexDirection: "column",
//     padding: ".5em 0",
//   },
//   bottomBarListIcon: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: ".5em",
//   },
//   bottomBarListText: {
//     textAlign: "center",
//   },
// }));
