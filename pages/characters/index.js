import { useState } from "react";
import Head from "next/head";
import { Container, Layout } from "components";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import jwt from "next-auth/jwt";
import Api from "helpers/api";
import { Table } from "components/Table";
import { useMounted } from "hooks/useMounted";
import Router from "next/router";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Character({ characters = [], npcs = [] }) {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const hasMounted = useMounted();

  if (!hasMounted) return null;

  return (
    <Layout>
      <Head>
        <title>Lierno App | Mis personajes</title>
      </Head>
      <Container
        noPadding
        header={
          <Box sx={{ p: "1em" }}>
            <Typography variant="h5" component="h1">
              Personajes
            </Typography>
          </Box>
        }
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Personajes" {...a11yProps(0)} />
            <Tab label="NPCs" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box
          component="div"
          role="tabpanel"
          hidden={value !== 0}
          id={`simple-tabpanel-${0}`}
          aria-labelledby={`simple-tab-${0}`}
        >
          <Table
            schema={{
              _id: "_id",
              name: "name",
              avatar: "flavor.portrait.avatar",
              description: "flavor.personality",
              owner: "createdBy"
            }}
            data={characters}
            src={"/characters/{ID}"}
            // onView={(id) => Router.push(`/characters/${id}`)}
            onEdit={(id) => Router.push(`/characters/add/${id}`)}
            onDelete={() => {}}
            headerProps={{
              onAdd: () => Router.push("/characters/add"),
            }}
          />
        </Box>
        <Box
          component="div"
          role="tabpanel"
          hidden={value !== 1}
          id={`simple-tabpanel-${1}`}
          aria-labelledby={`simple-tab-${1}`}
        >
          <Table
            schema={{
              _id: "_id",
              name: "name",
              avatar: "flavor.portrait.avatar",
              description: "flavor.description",
              owner: "createdBy"
            }}
            data={npcs}
            src={"/npcs/{ID}"}
            // onView={(id) => Router.push(`/npcs/${id}`)}
            onEdit={(id) => Router.push(`/npcs/add/${id}`)}
            onDelete={() => {}}
            headerProps={{
              onAdd: () => Router.push("/characters/add"),
            }}
          />
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const secret = process.env.SECRET;

  const token = await jwt.getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true,
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const characters = await Api.fetchInternal("/characters", {
    headers,
  }).catch((_) => null)

  const npcs = await Api.fetchInternal("/npcs", {
    headers,
  }).catch((_) => null)

  return {
    props: {
      characters,
      npcs,
    },
  };
}
