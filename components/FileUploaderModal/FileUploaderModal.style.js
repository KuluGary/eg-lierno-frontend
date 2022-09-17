/**
 * @see {@link https://mui.com/system/the-sx-prop|MUI Docs}
 */
const style = {
  container: {
    backgroundColor: (theme) => theme.palette.background.paper,
    textAlign: "center",
    "&:hover": { "box-shadow": (theme) => theme.shadows[1], backgroundColor: (theme) => theme.palette.action.hover },
  },
};

export default style;
