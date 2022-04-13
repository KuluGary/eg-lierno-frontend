import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { signIn } from "next-auth/react";
import { Link } from "..";

export default function AccessDenied() {
  const handleSignIn = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <>
      <Typography variant="h1">Acceso denegado</Typography>
      <Box component="p">
        <Typography variant="body1">
          <Link href="/api/auth/signing" onClick={handleSignIn}>
            Debes ingresar tus credenciales para ver esa página.
          </Link>
        </Typography>
      </Box>
    </>
  );
}
