import Head from "next/head";
import { Box, Button, Grid, Typography } from "@mui/material";

export default function Home() {

  return (
    <div>
      <Head>
        <title>Lierno App | Inicio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main">
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
      </Box>
    </div>
  );
}
