/**
 * @see {@link https://mui.com/system/the-sx-prop|MUI Docs}
 */
const style = {
  abilityScoresContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "75%",
    margin: "0 auto",
    flexWrap: "wrap",
    p: 3,
  },
  proficiencyContainer: {
    p: 0,
    listStyleType: "none",
  },
  proficiencyElement: {
    display: "flex",
    alignItems: "center",
  },
  proficiencyElementIcon: {
    marginRight: 15,
  },
  proficiencyElementTextContainer: {
    flexGrow: 1,
    width: "100%",
  },
  proficiencyElementTitle: {
    mr: 1,
    float: "left",
    fontWeight: "bold",
    width: "fit-content",
    whiteSpace: "nowrap",
  },
};

export default style;
