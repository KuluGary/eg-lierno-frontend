import { useState } from "react";
import Head from "next/head";
import { Grid, Box, Typography, Button, Divider, Container, Avatar, TextField, Paper } from "@mui/material";
import { Providers, signIn, getSession, csrfToken, getProviders } from "next-auth/client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright, Link } from "../../components";
import { StringUtil } from "../../helpers/string-util";

export default function login({ providers }) {
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Accede a Lierno App
          </Typography>
          <Typography component="div" variant="subtitle2" textAlign="center" marginTop=".5em">
            En Lierno App podrás llevar la cuenta de tus personajes y campañas de forma fácil e intuitiva.
          </Typography>
          {Object.values(providers)
            .filter((provider) => provider.id !== "credentials")
            .map((provider) => (
              <Box component="div" key={provider.name} sx={{ margin: "1em 0" }}>
                <Button variant="outlined" onClick={() => signIn(provider.id)}>
                  Accede con {provider.name}
                </Button>
              </Box>
            ))}
          <Box component="div" width="60%">
            <Divider>o con tu email</Divider>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "70%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
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
              label="Contraseña"
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
              <Grid item mobile >
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
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
    // <Grid container spacing={0} sx={{ width: "100vw", height: "100vh" }}>
    //   <Head>
    //     <title>Lierno App | Registrarse</title>
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <Grid item laptop={6} mobile={12}>
    //     <Container component="main" maxWidth="tablet">
    //       <Box sx={{ mt: "3em", display: "flex", flexDirection: "column", alignitems: "center" }}>
    //         <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
    //           <LockOutlinedIcon />
    //         </Avatar>
    //         <Typography component="h1" variant="h5">
    //           Accede a Lierno App
    //         </Typography>
    //         <Typography component="div" variant="subtitle2" textAlign="center" marginTop=".5em">
    //           En Lierno App podrás llevar la cuenta de tus personajes y campañas de forma fácil e intuitiva.
    //         </Typography>
    //         {Object.values(providers)
    //           .filter((provider) => provider.id !== "credentials")
    //           .map((provider) => (
    //             <Box component="div" key={provider.name} sx={{ margin: "1em 0" }}>
    //               <Button variant="outlined" onClick={() => signIn(provider.id)}>
    //                 Accede con {provider.name}
    //               </Button>
    //             </Box>
    //           ))}
    //         <Box component="div" width="100%">
    //           <Divider>o con tu email</Divider>
    //         </Box>
    //         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    //           <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             id="username"
    //             label="Nombre de usuario"
    //             name="username"
    //             autoComplete="email"
    //             autoFocus
    //             error={!!errors.username}
    //             onChange={handleChange}
    //             helperText={errors["username"]}
    //           />
    //           <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             name="password"
    //             label="Contraseña"
    //             type="password"
    //             id="password"
    //             autoComplete="current-password"
    //             error={!!errors.password}
    //             onChange={handleChange}
    //             helperText={errors["password"]}
    //           />
    //           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={hasErrors()}>
    //             Entrar
    //           </Button>
    //           <Grid container>
    //             <Grid item xs>
    //               <Link href="#" variant="body2">
    //                 Recuperar contraseña
    //               </Link>
    //             </Grid>
    //             <Grid item>
    //               <Link href="/register" color="primary" variant="body2">
    //                 {"¿No tienes una cuenta?"}
    //               </Link>
    //             </Grid>
    //           </Grid>
    //         </Box>
    //       </Box>
    //       <Copyright sx={{ mt: 8, mb: 4 }} />
    //     </Container>
    //   </Grid>
    //   <Grid
    //     item
    //     mobile={0}
    //     laptop={6}
    //     sx={{
    //       position: "relative",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       display: {
    //         mobile: "none",
    //         laptop: "block",
    //       },
    //       "& img": {
    //         maxWidth: "40vw",
    //       },
    //       "&::before": {
    //         content: "''",
    //         position: "absolute",
    //         top: 0,
    //         left: 0,
    //         backgroundImage:
    //           "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MzcuMyA3MDMuNyI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2VmZWVmZn08L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMCAwczE0Ny44IDEwMC44IDY3LjUgMzAwLjNTNjIwIDM3Ny41IDYyMCAzNzcuNWwtMjQuMiAxODAuNCA0MC42IDEzMS41IDIwMS02Mi44VjB6IiBjbGFzcz0iYSIvPjxwYXRoIGQ9Ik00MzkuNCAzMTAuOWMtNDUuMS0xLjYtODgtMTYuMS0xMjktMzJzLTgxLjUtMzMuNi0xMjUuNS00MmMtMjguMy01LjQtNjAuNy02LjItODMuNCA5LTIyIDE0LjYtMjkgMzkuNy0zMi45IDYzLjEtMi44IDE3LjYtNC41IDM2LjEgMy4zIDUyLjYgNS41IDExLjQgMTUuMiAyMSAyMS45IDMyIDIzLjMgMzggNi44IDg1LTE4LjUgMTIyLjItMTEuOCAxNy41LTI1LjUgMzQuMS0zNC43IDUyLjdzLTEzLjMgMzkuOC01LjMgNTguOEM0My4yIDY0NiA2MiA2NjAuMiA4Mi41IDY3MGM0MS42IDIwLjEgOTAuNSAyNiAxMzguMyAyOS4yIDEwNS43IDcuMiAyMTIgNCAzMTggMWE5MzQgOTM0IDAgMCAwIDExNy4xLTguNGMyMS40LTMuNCA0My41LTguOCA1OS4xLTIxLjZhNDkuNSA0OS41IDAgMCAwIDExLjQtNjQuN2MtMjIuMi0zNC40LTgzLjUtNDMtOTktODAtOC42LTIwLjMuMi00MyAxMi42LTYxLjkgMjYuNi00MC41IDcxLjItNzYgNzMuNi0xMjIuMyAxLjYtMzEuOC0xOS45LTYzLjYtNTMtNzguNkM2MjUuOCAyNDcgNTc3LjYgMjQ5IDU1MiAyNzVjLTI2LjUgMjYuOC03Mi45IDM3LjItMTEyLjYgMzUuOHoiIGNsYXNzPSJhIi8+PC9zdmc+)",
    //         backgroundRepeat: "no-repeat",
    //         opacity: 0.5,
    //         width: "100%",
    //         height: "100%",
    //         zIndex: -1,
    //       },
    //     }}
    //   >
    //     <img src={"art/authentication.svg "} />
    //   </Grid>
    // </Grid>
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
