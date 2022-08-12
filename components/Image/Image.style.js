const style = {
  modalStyles: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
    backgroundColor: (theme) => theme.palette.grey[900] + "B3",
    transitionDelay: "500ms",
    transition: (theme) =>
      theme.transitions.create(["opacity"], {
        easing: (theme) => theme.transitions.easing.sharp,
        duration: (theme) => theme.transitions.duration.shortest,
      }),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyles: {
    border: (theme) => `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": { opacity: 0.75 },
    transition: (theme) =>
      theme.transitions.create(["opacity"], {
        easing: (theme) => theme.transitions.easing.sharp,
        duration: (theme) => theme.transitions.duration.shortest,
      }),
  },
};

export default style;
