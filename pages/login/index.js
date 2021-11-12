import { useState } from "react";
import Head from "next/head";
import { Grid, Box, Typography, Button, Divider, Container, Avatar, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright, Link } from "../../components";
import { StringUtil } from "../../helpers/string-util";
import useStyles from "./index.styles";
import Router from "next/router";
import Api from "../../helpers/api";

export default function login() {
  const classes = useStyles();
  const regex = StringUtil.regex;
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const errorMessages = {
    username: "Este no es un email válido. Por favor, asegúrate que el email que introduces es correcto.",
    password:
      "Esta contraseña no es válida, por favor asegúrate de que tu contraseña tiene al menos un número, una letra mayúscula y minúscula, un carácter especial y tiene entre 6 y 20 carácteres.",
  };

  const handleChange = (e) => {
    const { value, attributes } = e.target;

    if (!!regex[attributes.id.value]) {
      if (!regex[attributes.id.value].test(value)) {
        setErrors({ ...errors, [attributes.id.value]: errorMessages[attributes.id.value] });
      } else {
        setErrors({ ...errors, [attributes.id.value]: "" });
      }
    }

    setCredentials({ ...credentials, [attributes.id.value]: value });
  };

  const hasErrors = () =>
    Object.values(errors).some((el) => el.length > 0) || Object.values(credentials).some((el) => el.length === 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.username && !errors.password) {
      Api.fetchInternal("/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then(() => Router.push("/"))
        .catch((err) => setErrors({ ...errors, password: err.toString() }));
    }
  };

  return (
    <Grid container spacing={0} className={classes.root}>
      <Head>
        <title>Lierno App | Registrarse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid item lg={6} sm={12}>
        <Container component="main" maxWidth="xs">
          <Box className={classes.form}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Accede a Lierno App
            </Typography>
            <Typography component="div" variant="subtitle2" textAlign="center" marginTop=".5em">
              En Lierno App podrás llevar la cuenta de tus personajes y campañas de forma fácil e intuitiva.
            </Typography>
            <Box component="div" margin="1em">
              <Button variant="outlined">Accede con Google</Button>
            </Box>
            <Box component="div" width="100%">
              <Divider>o con tu email</Divider>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                autoComplete="email"
                autoFocus
                error={!!errors.username}
                onChange={handleChange}
                helperText={errors["username"]}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                onChange={handleChange}
                helperText={errors["password"]}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={hasErrors()}>
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                   Recuperar contraseña
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" color="primary" variant="body2">
                    {"¿No tienes una cuenta?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Grid>
      <Grid item lg={6} className={classes.splashArt} sm={0}>
        <img src={"art/authentication.svg "} />
      </Grid>
    </Grid>
  );
}
