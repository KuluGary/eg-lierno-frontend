const style = ({ theme, drawerWidth, open, isMainScreen, isIntersecting }) => ({
  mainScreen: {
    display: "flex",
    justifyContent: "space-between",
    color: "inherit",
    height: "100%",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("tablet")]: {
      WebkitBackdropFilter: "blur(20px)",
      backdropFilter: "blur(20px)",
      backgroundColor: theme.palette.background.body,
      ...(isMainScreen && {
        WebkitBackdropFilter: "none",
        backdropFilter: "none",
        height: "auto",
        background: "transparent",
        color: "primary.contrastText",
        border: "none",
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.standard,
        }),
        ...(isIntersecting && {
          background: theme.palette.background.body,
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }),
      }),
    },
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
  default: {
    height: "60px",
    background: "none",
    backgroundColor: theme.palette.background.body,
    color: "text.primary",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
});

export default style;
