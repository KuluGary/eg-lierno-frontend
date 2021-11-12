import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 80,
    [theme.breakpoints.up("sm")]: {},
  },
  //   root: {
  //     marginTop: 60,
  //     marginBottom: "5rem",
  //     [theme.breakpoints.up("sm")]: {
  //       maxWidth: 1440,
  //       margin: "5rem auto",
  //       marginBottom: 0,
  //       paddingLeft: 80,
  //       paddingRight: 6
  //     }
  //   },
}));

export default useStyles;
