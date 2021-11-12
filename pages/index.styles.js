import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  hero: {
    backgroundColor: "pink",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },  
  textBoxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      maxWidth: "80vw",
      alignItems: "flex-start",
      padding: "3em 0",
      margin: "0 auto",
      "&::before": {
        content: "''",
        position: "absolute",
        top: 0,
        right: 0,
        backgroundImage:
          "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MzcuMyA3MDMuNyI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2VmZWVmZn08L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMCAwczE0Ny44IDEwMC44IDY3LjUgMzAwLjNTNjIwIDM3Ny41IDYyMCAzNzcuNWwtMjQuMiAxODAuNCA0MC42IDEzMS41IDIwMS02Mi44VjB6IiBjbGFzcz0iYSIvPjxwYXRoIGQ9Ik00MzkuNCAzMTAuOWMtNDUuMS0xLjYtODgtMTYuMS0xMjktMzJzLTgxLjUtMzMuNi0xMjUuNS00MmMtMjguMy01LjQtNjAuNy02LjItODMuNCA5LTIyIDE0LjYtMjkgMzkuNy0zMi45IDYzLjEtMi44IDE3LjYtNC41IDM2LjEgMy4zIDUyLjYgNS41IDExLjQgMTUuMiAyMSAyMS45IDMyIDIzLjMgMzggNi44IDg1LTE4LjUgMTIyLjItMTEuOCAxNy41LTI1LjUgMzQuMS0zNC43IDUyLjdzLTEzLjMgMzkuOC01LjMgNTguOEM0My4yIDY0NiA2MiA2NjAuMiA4Mi41IDY3MGM0MS42IDIwLjEgOTAuNSAyNiAxMzguMyAyOS4yIDEwNS43IDcuMiAyMTIgNCAzMTggMWE5MzQgOTM0IDAgMCAwIDExNy4xLTguNGMyMS40LTMuNCA0My41LTguOCA1OS4xLTIxLjZhNDkuNSA0OS41IDAgMCAwIDExLjQtNjQuN2MtMjIuMi0zNC40LTgzLjUtNDMtOTktODAtOC42LTIwLjMuMi00MyAxMi42LTYxLjkgMjYuNi00MC41IDcxLjItNzYgNzMuNi0xMjIuMyAxLjYtMzEuOC0xOS45LTYzLjYtNTMtNzguNkM2MjUuOCAyNDcgNTc3LjYgMjQ5IDU1MiAyNzVjLTI2LjUgMjYuOC03Mi45IDM3LjItMTEyLjYgMzUuOHoiIGNsYXNzPSJhIi8+PC9zdmc+)",
        backgroundRepeat: "no-repeat",
        opacity: 0.5,
        width: "100%",
        height: "100%",
        backgroundPosition: "top right"      
      },
    }
  },
  textBox: {
    maxWidth: "500px",
    [theme.breakpoints.down("sm")]: {
      zIndex: 2
    }
  },
  description: {
    margin: "1.75em 0"
  },
  imageBox: {
    position: "relative",
    height: "100%",
    width: "100%",
    "& img": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "30vw",
      zIndex: 2,
    },
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      right: 0,
      backgroundImage:
        "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MzcuMyA3MDMuNyI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2VmZWVmZn08L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMCAwczE0Ny44IDEwMC44IDY3LjUgMzAwLjNTNjIwIDM3Ny41IDYyMCAzNzcuNWwtMjQuMiAxODAuNCA0MC42IDEzMS41IDIwMS02Mi44VjB6IiBjbGFzcz0iYSIvPjxwYXRoIGQ9Ik00MzkuNCAzMTAuOWMtNDUuMS0xLjYtODgtMTYuMS0xMjktMzJzLTgxLjUtMzMuNi0xMjUuNS00MmMtMjguMy01LjQtNjAuNy02LjItODMuNCA5LTIyIDE0LjYtMjkgMzkuNy0zMi45IDYzLjEtMi44IDE3LjYtNC41IDM2LjEgMy4zIDUyLjYgNS41IDExLjQgMTUuMiAyMSAyMS45IDMyIDIzLjMgMzggNi44IDg1LTE4LjUgMTIyLjItMTEuOCAxNy41LTI1LjUgMzQuMS0zNC43IDUyLjdzLTEzLjMgMzkuOC01LjMgNTguOEM0My4yIDY0NiA2MiA2NjAuMiA4Mi41IDY3MGM0MS42IDIwLjEgOTAuNSAyNiAxMzguMyAyOS4yIDEwNS43IDcuMiAyMTIgNCAzMTggMWE5MzQgOTM0IDAgMCAwIDExNy4xLTguNGMyMS40LTMuNCA0My41LTguOCA1OS4xLTIxLjZhNDkuNSA0OS41IDAgMCAwIDExLjQtNjQuN2MtMjIuMi0zNC40LTgzLjUtNDMtOTktODAtOC42LTIwLjMuMi00MyAxMi42LTYxLjkgMjYuNi00MC41IDcxLjItNzYgNzMuNi0xMjIuMyAxLjYtMzEuOC0xOS45LTYzLjYtNTMtNzguNkM2MjUuOCAyNDcgNTc3LjYgMjQ5IDU1MiAyNzVjLTI2LjUgMjYuOC03Mi45IDM3LjItMTEyLjYgMzUuOHoiIGNsYXNzPSJhIi8+PC9zdmc+)",
      backgroundRepeat: "no-repeat",
      opacity: 0.5,
      width: "100%",
      height: "100%",
      backgroundPosition: "top right"      
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    margin: "0 1em"
  }
}));

export default useStyles;
