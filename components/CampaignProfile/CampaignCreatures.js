import { Grid, Tab, Tabs, Box } from "@mui/material";
import Api from "helpers/api";
import { useEffect, useState } from "react";
import { Container } from "components";
import { Table } from "components/Table";
import Router from "next/router";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function CampaignCreatures({ campaign }) {
  const [creatures, setCreatures] = useState({});
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => fetchNewCreatures(), []);

  const fetchNewCreatures = async () => {
    const newCreatures = {
      npcs: await Api.fetchInternal("/campaigns/" + campaign._id + "/npcs"),
      monsters: await Api.fetchInternal("/campaigns/" + campaign._id + "/monsters")
    };

    setCreatures(newCreatures)
  };

  return (
    <Grid item laptop={12} container spacing={2}>
      <Grid item laptop={12}>
        <Container noPadding>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="NPCs" {...a11yProps(0)} />
              <Tab label="Monstruos" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box
            component="div"
            role="tabpanel"
            hidden={value !== 0}
            id={`simple-tabpanel-${0}`}
            aria-labelledby={`simple-tab-${0}`}
          >
            {!!creatures.npcs && (
              <Table
                schema={{
                  _id: "_id",
                  name: "name",
                  avatar: "flavor.portrait.avatar",
                  description: "flavor.description",
                  owner: "createdBy"
                }}
                data={creatures.npcs}
                src={"/npcs/{ID}"}
                onEdit={(id) => Router.push(`/npcs/add/${id}`)}
                onDelete={() => {}}
                headerProps={{
                  onAdd: () => Router.push("/characters/add"),
                }}
              />
            )}
          </Box>
          <Box
            component="div"
            role="tabpanel"
            hidden={value !== 1}
            id={`simple-tabpanel-${1}`}
            aria-labelledby={`simple-tab-${1}`}
          >
            {!!creatures.monsters && (
              <Table
                schema={{
                  _id: "_id",
                  name: "name",
                  avatar: "flavor.portrait.original",
                  description: "flavor.description",
                  owner: "createdBy"
                }}
                data={creatures.monsters}
                onView={(id) => Router.push(`/bestiary/${id}`)}
                onEdit={(id) => Router.push(`/bestiary/add/${id}`)}
                onDelete={() => {}}
                headerProps={{
                  onAdd: () => Router.push("/characters/add"),
                }}
              />
            )}
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
