import Head from "next/head";
import useStyles from "./index.styles";
import { Box, Button, Grid, Typography } from "@mui/material";

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Head>
        <title>Lierno App | Inicio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main">
        <Box component="section" className={classes.hero}>
          <Grid container spacing={0} width="100%" height="100%">
            <Grid item lg={6} sm={12} className={classes.textBoxContainer}>
              <Box className={classes.textBox}>
                <Typography variant="h1" className={classes.title}>
                  La app para gestionar tus partidas de{" "}
                  <Box component="span" color="primary.main">
                    D&D
                  </Box>
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  Lierno App provee todas las herramientas necesarias para crear y gestionar las partidas y personajes
                  de tus juegos de mesa interpretativos.
                </Typography>
                <Box className={classes.buttonBox}>
                  <Button className={classes.button} onClick={() => {}} variant="outlined">
                    ENTRA
                  </Button>
                  <Button className={classes.button} onClick={() => {}} variant="contained">
                    REGÍSTRATE
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6} sm={0} className={classes.imageBox}>
              <img src={"art/my_feed.svg"} />
            </Grid>
          </Grid>
        </Box>        
      </Box>
    </div>
  );
}
