import { useState } from "react";
import Head from "next/head";
import { Grid, Box, Typography, Button, FormControlLabel, Container, Avatar, TextField, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright, Link } from "components";
import { StringUtil } from "helpers/string-util";
import Router from "next/router";
import { toast } from "react-toastify";
import Api from "helpers/api";

export default function Register() {
  const regex = StringUtil.regex;
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    metadata: { first_name: "", last_name: "", email: "" },
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    metadata: { first_name: "", last_name: "", email: "" },
  });
  const errorMessages = {
    username: "Este no es un nombre de usuario válido. Asegúrate de que al menos tenga 3 carácteres.",
    password:
      "Esta contraseña no es válida, por favor asegúrate de que tu contraseña tiene al menos un número, una letra mayúscula y minúscula, un carácter especial y tiene entre 6 y 20 carácteres.",
    metadata: {
      first_name: "Por favor introduce un nombre válido.",
      last_name: "Por favor introduce un apellido válido.",
      email: "Este no es un email válido. Por favor, asegúrate que el email que introduces es correcto.",
    },
  };

  const handleChange = (e) => {
    const { value, attributes } = e.target;
    const id = attributes.id.value;

    if (!!regex[id]) {
      if (!regex[id].test(value)) {
        if (id in credentials) {
          setErrors({ ...errors, [id]: errorMessages[id] });
        } else {
          setErrors({ ...errors, metadata: { ...errors.metadata, [id]: errorMessages.metadata[id] } });
        }
      } else {
        if (id in credentials) {
          setErrors({ ...errors, [id]: "" });
        } else {
          setErrors({ ...errors, metadata: { ...errors.metadata, [id]: "" } });
        }
      }
    }

    if (id in credentials) {
      setCredentials({ ...credentials, [id]: value });
    } else {
      setCredentials({ ...credentials, metadata: { ...credentials.metadata, [id]: value } });
    }
  };

  const hasErrors = () =>
    errors["username"].length > 0 ||
    errors["password"].length > 0 ||
    errors["metadata"]["email"].length > 0 ||
    errors["metadata"]["first_name"].length > 0 ||
    errors["metadata"]["last_name"].length > 0 ||
    !credentials["username"].length > 0 ||
    !credentials["password"].length > 0 ||
    !credentials["metadata"]["email"].length > 0 ||
    !credentials["metadata"]["first_name"].length > 0 ||
    !credentials["metadata"]["last_name"].length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    Api.fetchInternal("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        toast.success(res.message);
        Router.push("/")
      })
      .catch((err) => toast.error(err.toString()));
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Head>
        <title>Lierno App | Registrarse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        item
        mobile={false}
        tablet={4}
        laptop={6}
        sx={{
          backgroundImage:
            "url(art/login-bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item mobile={12} tablet={8} laptop={6} component={Paper} elevation={6} square>
      <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Regístrate en Lierno App
            </Typography>
            <Typography component="div" variant="subtitle2" textAlign="center" marginTop=".5em">
              En Lierno App podrás llevar la cuenta de tus personajes y campañas de forma fácil e intuitiva.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: "60%" }}>
              <Grid container spacing={2}>
                <Grid item mobile={12} laptop={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="first_name"
                    label="Nombre"
                    autoFocus
                    onChange={handleChange}
                    error={!!errors["metadata"]["first_name"]}
                    helperText={errors["metadata"]["first_name"]}
                  />
                </Grid>
                <Grid item mobile={12} laptop={6}>
                  <TextField
                    required
                    fullWidth
                    id="last_name"
                    label="Apellidos"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleChange}
                    error={!!errors["metadata"]["last_name"]}
                    helperText={errors["metadata"]["last_name"]}
                  />
                </Grid>

                <Grid item mobile={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Cuenta de email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    error={!!errors["metadata"]["email"]}
                    helperText={errors["metadata"]["email"]}
                  />
                </Grid>
                <Grid item mobile={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nombre de usuario"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleChange}
                    error={!!errors["username"]}
                    helperText={errors["username"]}
                  />
                </Grid>
                <Grid item mobile={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    error={!!errors["password"]}
                    helperText={errors["password"]}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={hasErrors()}>
                Registrarse
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    ¿Ya tienes una cuenta? Entrar
                  </Link>
                </Grid>
              </Grid>
            </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
