import { useRef } from "react";
import Head from "next/head";
import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { Link, NavBar } from "../components";

export default function Home() {
  const heroRef = useRef(null);

  return (
    <Box component="main">
      <Head>
        <title>Lierno App | Inicio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar mode="transparent" containerRef={heroRef} />
      <Box
        component="section"
        ref={heroRef}
        elevation={6}
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: "url(art/home-bg.jfif)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 0,
        }}
      >
        <Box component="div" sx={{ maxWidth: "85vw", margin: "0 auto", pt: 8 }}>
          <Box component="div" sx={{ maxWidth: { laptop: "40%", mobile: "100%" } }}>
            <Typography variant="h1" color="grey.A100">
              {"La app para gestionar tus partidas de "}
              <Box component="span" color="secondary.main">
                {"D&D"}
              </Box>
            </Typography>
            <Typography variant="subtitle1" color="grey.A100" mt={2}>
              Lierno App provee todas las herramientas necesarias para crear y gestionar las partidas y personajes de
              tus juegos de mesa interpretativos.
            </Typography>
            <Link
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <Button sx={{ mt: 2, color: "secondary.light" }}>Entrar a la aplicación</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
