const style = {
  childrenContainer: {
    cursor: "pointer",
    textDecoration: "underline dashed",
  },
  modalContainer: {
    width: "fit-content",
    minWidth: 0,
    minHeight: 0,
    height: "fit-content",
  },
  modalContentContainer: {
    maxWidth: {
      tablet: "70%",
      mobile: "100%",
    },
    margin: "12px auto",
    display: "flex",
    flexDirection: {
      tablet: "row",
      mobile: "column",
    },
    alignItems: {
      tablet: "stretch",
      mobile: "center",
    },
    justifyContent: "center",
    gap: 1,
  },
  sectionContainer: {
    outline: (theme) => `1px solid ${theme.palette.divider}`,
    borderRadius: "12px",
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
  },
  damageCalcContainer: {
    maxWidth: {
      mobile: "50%",
      tablet: "35%",
    },
  },
  dataContainer: {
    flexGrow: 1,
    margin: 1,
  },
  dataContainerSection: {
    display: "flex",
    gap: 4,
    marginInline: 2,
    marginBlock: 0,
    textAlign: "center",
    justifyContent: "space-between",
  },
  dataContainerBody: {
    display: "flex",
    gap: 4,
    marginInline: 2,
    marginBlock: 1,
    textAlign: "center",
    justifyContent: "space-between",

    flexGrow: 1,
    alignItems: "center",
  },
  button: {
    fontSize: ".65em",
  },
};

export default style;
