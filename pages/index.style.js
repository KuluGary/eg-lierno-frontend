const style = {
  hero: {
    position: "relative",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: "url(art/home-bg.jfif)",
      backgroundRepeat: "no-repeat",
      backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(60%)",
      zIndex: -1,
    },
  },
  h1: {
    maxWidth: "30ch",
    textAlign: "center",
  },
  buttonContainer: {
    marginBlock: "2em",
    display: "flex",
    gap: "2em",
  },
};

export default style;
