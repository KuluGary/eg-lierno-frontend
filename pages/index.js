import { Box, Button, Typography } from "@mui/material";
import { getSession, signIn } from "next-auth/react";
import { Link } from "../components";
import style from "./index.style";

export default function Home() {
  return (
    <Box>
      <Box sx={style.hero}>
        <Typography component="h1" variant="h3" color="primary.contrastText" sx={style.h1}>
          {"Gestiona tus partidas de "}
          <Box component="span" color="secondary.main">
            {"D&D"}
          </Box>
        </Typography>
        <Typography component="subtitle1" color="primary.contrastText">
          {"Organiza y ten al alcance de tu mano toda la información que necesitas para tus sesiones de D&D"}
        </Typography>
        <Box sx={style.buttonContainer}>
          <Link href="/register">
            <Button size="large" variant="contained" color="secondary">
              Prueba Lierno App
            </Button>
          </Link>
          <Link
            href={"/api/auth/signing"}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <Button size="large" variant="outlined" color="background">
              Accede con tu cuenta
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ ctx });

  if (!session) return { props: {} };

  return {
    redirect: {
      permanent: true,
      destination: "/characters",
    },
  };
}
