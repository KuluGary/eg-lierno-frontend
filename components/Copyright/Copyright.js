import { Link, Typography } from "@mui/material";

export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Lierno App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


