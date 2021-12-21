import { Typography, Box } from "@mui/material";
import { Layout, Container } from "components";
import { Table } from "components/Table";
import Api from "helpers/api";
import Head from "next/head";
import jwt from "next-auth/jwt";
import Router from "next/router";

export default function Campaigns({ campaigns }) {
  console.log(campaigns)
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
            description: "flavor.synopsis",
          }}
          data={campaigns}
          onView={(id) => Router.push(`/campaigns/${id}`)}
          onEdit={(id) => Router.push(`/campaigns/add/${id}`)}
        />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const secret = process.env.SECRET;

  const token = await jwt.getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  console.log(token)

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
  }).catch(err => null)

  return {
    props: {
      campaigns,
    },
  };
}
