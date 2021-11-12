import { useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

export const breakpoints = {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  width: typeof window !== "undefined" ? window.innerWidth : 0,
  down: function (key) {
    return this.width < this.breakpoints[key];
  },
  up: function (key) {

    return this.width > this.breakpoints[key];
  },
  only: function (key) {

    return this.width === this.breakpoints[key];
  },
  between: function (start, end) {

    return this.width > this.breakpoints[start] && this.width < this.breakpoints[end];
  },
};
