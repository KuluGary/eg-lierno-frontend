/**
 * @see {@link https://mui.com/system/the-sx-prop|MUI Docs}
 */
const style = {
  cardContainer: {
    margin: "0 .25em" 
  },
  cardMedia: {
    filter: "brightness(35%)",
  },
  cardContent: {
    position: "absolute",
    top: 0,
    display: "flex",
    gap: "1em",
    alignItems: "center",
  },
  subtitleName: {
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  subtitleDescription: {
    opacity: 0.75,
    fontWeight: 400,
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    gap: "2em",
  },
  buttonContainer: {
    margin: "0 .25em",
  },
};

export default style;
