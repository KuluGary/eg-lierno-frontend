/**
 * @see {@link https://mui.com/system/the-sx-prop|MUI Docs}
 */
const style = {
  cardContainer: {
    width: 345,
    position: "relative",
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
  cardTitle: {
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cardSubtitle: {
    opacity: 0.75,
    fontWeight: 400,
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
    gap: "2em",
  },
};

export default style;
