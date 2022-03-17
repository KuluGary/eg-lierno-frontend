import { Box, Divider, Typography } from "@mui/material";
import { Link } from "components";

export default function NotFound() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: (t) => t.palette.background.container,
        // color: (t) => t.palette.primary.contrastText,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h5" component="h1" color="background.contrastText">
          404
        </Typography>
        <Divider />
        <Typography variant="subtitle1" component="h1" color="background.contrastText">
          No se ha podido encontrar la página.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", marginBlock: 1 }}>
          <Link href="/login">
            <Typography variant="subtitle2" color="secondary">Volver al login</Typography>
          </Link>
          <Link href="/">
            <Typography variant="subtitle2" color="secondary">Volver al inicio</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
