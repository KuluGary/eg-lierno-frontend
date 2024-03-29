import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Divider, Grid, Paper, TextField, Typography, CircularProgress } from "@mui/material";
import { Copyright, Link } from "components";
import { StringUtil } from "helpers/string-util";
import { getProviders, getSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

export default function Login({ providers }) {
  const regex = StringUtil.regex;
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const errorMessages = {
    username: "Este no es un nombre de usuario válido. Por favor, asegúrate que el email que introduces es correcto.",
    password:
      "Esta contraseña no es válida, por favor asegúrate de que tu contraseña tiene al menos un número, una letra mayúscula y minúscula, un carácter especial y tiene entre 6 y 20 carácteres.",
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (!!regex[name]) {
      if (!regex[name].test(value)) {
        setErrors({ ...errors, [name]: errorMessages[name] });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }

    setCredentials({ ...credentials, [name]: value });
  };

  const hasErrors = () =>
    Object.values(errors).some((el) => el.length > 0) || Object.values(credentials).some((el) => el.length === 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    signIn("credentials", credentials);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Head>
        <title>Lierno App | Entrar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        item
        mobile={0}
        tablet={4}
        laptop={6}
        sx={{
          backgroundImage: "url(art/login-bg.jpg)",
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Accede a Lierno App
          </Typography>
          <Typography component="div" variant="subtitle2" textAlign="center" marginTop=".5em">
            En Lierno App podrás llevar la cuenta de tus personajes y campañas de forma fácil e intuitiva.
          </Typography>
          {Object.values(providers || {})
            .filter((provider) => provider.id !== "credentials")
            .map((provider) => (
              <Box component="div" key={provider.name} sx={{ margin: "1em 0" }}>
                <Button
                  variant="outlined"
                  onClick={() => signIn(provider.id)}
                  sx={{ pt: ".15em", pb: ".15em", pl: ".15em" }}
                  startIcon={<Box component="img" src={"icons/btn_google_light_normal_ios.svg"} />}
                >
                  Accede con {provider.name}
                </Button>
              </Box>
            ))}
          <Box component="div" width="60%">
            <Divider>o con tu email</Divider>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: "70%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="email"
              autoFocus
              color="secondary"
              error={!!errors.username}
              onChange={handleChange}
              helperText={errors["username"]}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              color="secondary"
              autoComplete="current-password"
              error={!!errors.password}
              onChange={handleChange}
              helperText={errors["password"]}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ marginBlock: 3, p: 1 }}
              disabled={hasErrors() || loading}
            >
              {loading ? <CircularProgress size={25} color="secondary" /> : "Entrar"}
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Link href="#" variant="body2">
                Recuperar contraseña
              </Link>
              <Link href="/register" color="primary" variant="body2">
                {"¿No tienes una cuenta?"}
              </Link>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const { req } = context;

  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: { providers },
  };
}
