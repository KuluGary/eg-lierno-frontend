const style = {
  unAuthLink: {
    textDecoration: "none",
  },
  goToAppLink: {
    mr: 6,
    color: "inherit",
    textDecoration: "none",
    "&:hover": { color: (t) => t.palette.secondary.main },
  },
  svg: (theme) => ({
    width: "24px",
    height: "24px",
    fill: theme.palette.grey["500"],
  }),
  firstPath: (theme) => ({
    transformOrigin: "center center",
    transition: "transform 750ms cubic-bezier(0.11, 0.14, 0.29, 1.32)",
    transform: theme.palette.mode === "light" ? "rotate(0.5turn)" : "",
  }),
  secondPath: (theme) => ({
    transition: "transform 500ms ease-out",
    transform: theme.palette.mode === "light" ? "translateX(-15%)" : "",
  }),
};

export default style;
