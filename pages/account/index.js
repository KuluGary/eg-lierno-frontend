import { Box, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Avatar, Container, Layout } from "components";
import Api from "helpers/api";
import { getToken } from "next-auth/jwt";

export default function Settings({ user }) {
  console.log(user);
  const getISODate = (date) => {
    const d = new Date(date);

    return d.toLocaleDateString("es-ES");
  };
  return (
    <Layout>
      <Container>
        <Typography variant="h5" component="h1">
          Ajustes
        </Typography>
      </Container>
      <Container sx={{ marginTop: "1rem" }}>
        <Grid container spacing={1}>
          <Grid item laptop={4}>
            <Container noPadding>
              <Box sx={{ margin: "1rem", display: "flex", alignItems: "center", gap: "1em" }}>
                <Avatar src={user.metadata.avatar} />
                <Typography>{user.username}</Typography>
              </Box>
              <Divider />
              <List>
                {user.metadata.first_name && user.metadata.last_name && (
                  <ListItem>
                    <ListItemText
                      primary={`${user.metadata.first_name} ${user.metadata.last_name}`}
                      secondary={"Nombre"}
                    />
                  </ListItem>
                )}
                {user.metadata.email && (
                  <ListItem>
                    <ListItemText primary={user.metadata.email} secondary={"Email"} />
                  </ListItem>
                )}
                {user.createdAt && (
                  <ListItem>
                    <ListItemText primary={getISODate(user.createdAt)} secondary={"Fecha de creación"} />
                  </ListItem>
                )}
                {user.metadata.location && (
                  <ListItem>
                    <ListItemText primary={user.metadata.location} secondary={"Ubicación"} />
                  </ListItem>
                )}
              </List>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const secret = process.env.SECRET;

  const token = await getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  console.log(token);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true,
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const user = await Api.fetchInternal("/auth/user", { headers });
  console.log(user);

  if (!user) return { notFound: true };

  return {
    props: { user },
  };
}
