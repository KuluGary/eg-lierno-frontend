/**
 * @see {@link https://mui.com/system/the-sx-prop|MUI Docs}
 */
const style = {
  container: {
    margin: ".5em",
  },
  iconButton: {
    border: (t) => `1px solid ${t.palette.secondary.main}80`,
    borderRadius: "8px",
    padding: ".25em",
    transition: (t) =>
      t.transitions.create(["border"], {
        easing: (t) => t.transitions.easing.sharp,
        duration: (t) => t.transitions.duration.leavingScreen,
      }),
    "&:hover": {
      border: (t) => `1px solid ${t.palette.secondary.main}`,
    },
  },
};

export default style;
