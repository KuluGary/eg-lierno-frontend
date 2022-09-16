/**
 * @see {@link https://mui.com/system/the-sx-prop|MUI Docs}
 */
const style = {
  modalContentContainer: {
    display: "flex",
    alignItems: "flex-end",
    gap: "1ch",
    marginBlock: "1rem",
  },
  modalTitle: {
    margin: 0,
    lineHeight: 0,
  },
  modalSubtitle: {
    margin: 0,
    lineHeight: 0,
  },
  tableCell: {
    fontSize: "1rem",
    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
  },
  labelDescriptionContainer: {
    marginBlock: "1rem",
  },
  statContainer: (theme) => ({
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    margin: "1em .25em",
    div: {
      transition: theme.transitions.create(["outline"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
    },
    g: {
      stroke: theme.palette.divider,
      strokeWidth: 20,
      transition: theme.transitions.create(["stroke"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
    },
    "&:hover > div": {
      outline: `2px solid ${theme.palette.secondary[theme.palette.mode]}`,
    },
    "&:hover g": {
      stroke: theme.palette.secondary[theme.palette.mode],
      strokeWidth: 60,
    },
  }),
  abilityScoreContainer: {
    outline: (theme) => `1px solid ${theme.palette.divider}`,
    borderRadius: "12px",
    width: "fit-content",
  },
  abilityScoreLabelContainer: {
    paddingInline: 3,
    paddingBlock: 0.5,
    display: "flex",
    justifyContent: "center",
  },
  abilityScoreLabel: {
    textAlign: "center",
  },
  abilityScoreValue: {
    paddingInline: 3,
    pb: 2,
    pt: 1,
    textAlign: "center",
  },
  shieldIcon: {
    position: "absolute",
    bottom: "-2rem",
  },
  abilityModifier: {
    textAlign: "center",
    position: "absolute",
    bottom: "-1rem",
  },
};

export default style;
