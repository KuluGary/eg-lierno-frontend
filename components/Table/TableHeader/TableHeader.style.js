const style = {
  searchInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    m: "1em",
  },
  filterButtonContainer: {
    m: "1em",
    gap: 1,
    display: "flex",
  },
  filterButton: {
    border: (theme) => `1px solid ${theme.palette.primary.main}80`,
    borderRadius: "8px",
    padding: ".25em",
    transition: (theme) =>
      theme.transitions.create(["border"], {
        easing: (theme) => theme.transitions.easing.sharp,
        duration: (theme) => theme.transitions.duration.leavingScreen,
      }),
    "&:hover": {
      border: (theme) => `1px solid ${theme.palette.primary.main}`,
    },
  },
  filterContainer: {
    m: "1em",
    opacity: 0,
    transition: (theme) =>
      theme.transitions.create(["opacity"], {
        easing: (theme) => theme.transitions.easing.sharp,
        duration: (theme) => theme.transitions.duration.leavingScreen,
      }),
    transitionDelay: "250ms",
  },
};

export default style;
