const lightTheme = {
  palette: {
    primary: {
      light: "#e2e5e8",
      200: "#8591a1",
      main: "#0a2342",
      dark: "#091f3c",
      800: "#05152b",
    },
    secondary: {
      light: "#96D2C6",
      200: "#96D2C6",
      main: "#2CA58D",
      dark: "#279D85",
      800: "#1B8A70",
    },
    success: {
      light: "#B9F6CA",
      200: "#69F0AE",
      main: "#69F0AE",
      dark: "#00C853",
    },
    orange: {
      light: "#FBE9E7",
      main: "#FFAB91",
      dark: "#D84315",
    },
    error: {
      light: "#EF9A9A",
      main: "#F44336",
      dark: "#C62828",
    },
    warning: {
      light: "#B9F6CA",
      main: "#FFE57F",
      dark: "#FFC107",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      900: "#212121",
      white: "#FFFFFF",
    },
    background: {
      body: "#FFFFFF",
      paper: "#FFFFFF",
      container: "#E2E5E8"
    },
    divider: "#8B9FA133",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    h1: {
      fontSize: "clamp(2.625rem,1.2857rem + 3.5714vw,4rem)",
      fontWeight: 700,
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  mixins: {
    noScrollbar: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "-ms-overflow-style": "none" /* IE and Edge */,
      "scrollbar-width": "none"
    }
  }
};

const darkTheme = {
  palette: {
    primary: {
      light: "#E2E5E8",
      200: "#8591A1",
      main: "#54657B",
      dark: "#091F3C",
      800: "#05152B",
    },
    secondary: {
      light: "#E6F4F1",
      200: "#96D2C6",
      main: "#2CA58D",
      dark: "#279D85",
      800: "#1B8A70",
    },
    success: {
      light: "#B9F6CA",
      200: "#69F0AE",
      main: "#69F0AE",
      dark: "#00C853",
    },
    orange: {
      light: "#FBE9E7",
      main: "#FFAB91",
      dark: "#D84315",
    },
    error: {
      light: "#EF9A9A",
      main: "#F44336",
      dark: "#C62828",
    },
    warning: {
      light: "#B9F6CA",
      main: "#FFE57F",
      dark: "#FFC107",
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      900: "#212121",
      white: "#FFFFFF",
    },
    background: {
      body: "#030C1D",
      paper: "#091F3C",
      container: "#051327"
    },
    divider: "#BDC8F033",
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    h1: {
      fontSize: "clamp(2.625rem,1.2857rem + 3.5714vw,4rem)",
      fontWeight: 700,
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  mixins: {
    noScrollbar: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "-ms-overflow-style": "none" /* IE and Edge */,
      "scrollbar-width": "none"
    }
  }
};

export { lightTheme,darkTheme };
