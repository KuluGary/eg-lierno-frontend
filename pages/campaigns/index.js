import { Typography, Box } from "@mui/material";
import { Layout, Container } from "components";
import { Table } from "components/Table";
import Api from "helpers/api";
import Head from "next/head";
import { getToken } from "next-auth/jwt";
import Router from "next/router";

export default function Campaigns({ campaigns }) {
  return (
    <Layout>
      <Head>
        <title>Lierno App | Mis campañas</title>
      </Head>
      <Container
        noPadding
        header={
          <Box sx={{ p: "1em" }}>
            <Typography variant="h5" component="h1">
              Campañas
            </Typography>
          </Box>
        }
      >
        <Table
          schema={{
            _id: "_id",
            name: "name",
            avatar: null,
            owner: "dm",
          }}
          data={campaigns}
          src={"/campaigns/{ID}"}
          onEdit={(id) => Router.push(`/campaigns/add/${id}`)}
        />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const secret = process.env.SECRET;

  const token = await getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true,
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const campaigns = await Api.fetchInternal("/campaigns", {
    headers,
  }).catch((_) => null);

  return {
    props: {
      campaigns,
    },
  };
}
