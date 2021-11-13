import Head from "next/head";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { attributes } from "../content/home.md";

export default function Home() {
  const { title, cats } = attributes;

  return (
    <div>
      <Head>
        <title>Lierno App | Inicio</title>
        <link rel="icon" href="/favicon.ico" />
        <script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <Box
        component="section"
        elevation={6}
        sx={{
          width: "100%",
          height: "80vh",
          backgroundImage:
            "url(art/home-bg.jfif)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 0,
        }}
      >
        <Box component="div" sx={{ maxWidth: "85vw", margin: "0 auto", pt: 8 }}>
          <Box component="div" sx={{ maxWidth: { laptop: "40%", mobile: "100%"} }}>
            <Typography variant="h1" color="grey.A100">
              La app para gestionar tus partidas de{" "}
              <Box component="span" color="primary.main">
                D&D
              </Box>
            </Typography>
            <Typography variant="subtitle1" color="grey.A100" mt={2}>
              Lierno App provee todas las herramientas necesarias para crear y gestionar las partidas y personajes de
              tus juegos de mesa interpretativos.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        component={Paper}
        elevation={6}
        sx={{
          maxWidth: "95vw",
          margin: "-5em auto",
          p: 5
        }}
      >
        <Typography variant="h3">{title}</Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <ul>
          {cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </Box>

      {/* <article>
        <h1>{title}</h1>
        <HomeContent />
        <ul>
          {cats.map((cat, k) => (
            <li key={k}>
              <h2>{cat.name}</h2>
              <p>{cat.description}</p>
            </li>
          ))}
        </ul>
      </article> */}

      {/* <Box component="main">
        <Box component="section">
          <Grid container spacing={0} width="100%" height="100%">
            <Grid item lg={6} sm={12}>
              <Box>
                <Typography variant="h1">
                  La app para gestionar tus partidas de{" "}
                  <Box component="span" color="primary.main">
                    D&D
                  </Box>
                </Typography>
                <Typography variant="body1">
                  Lierno App provee todas las herramientas necesarias para crear y gestionar las partidas y personajes
                  de tus juegos de mesa interpretativos.
                </Typography>
                <Box>
                  <Button onClick={() => {}} variant="outlined">
                    ENTRA
                  </Button>
                  <Button onClick={() => {}} variant="contained">
                    REGÍSTRATE
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6} sm={0}>
              <img src={"art/my_feed.svg"} />
            </Grid>
          </Grid>
        </Box>
      </Box> */}
    </div>
  );
}
