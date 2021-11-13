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