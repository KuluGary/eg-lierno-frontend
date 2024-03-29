import { getNestedKey } from "@lierno/core-helpers";
import { getNpcSubtitle } from "@lierno/dnd-helpers";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { Container } from "components";
import { PaginatedTable } from "components/Table";
import Router from "next/router";
import { useState } from "react";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function CampaignCreatures({ campaign }) {
  const [isLoading] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
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
          {value === 0 && (
            <Box
              component="div"
              role="tabpanel"
              hidden={value !== 0}
              id={`simple-tabpanel-${0}`}
              aria-labelledby={`simple-tab-${0}`}
            >
              <PaginatedTable
                getRowData={(element) => ({
                  _id: getNestedKey("_id", element),
                  id: getNestedKey("id", element),
                  name: getNestedKey("name", element),
                  avatar: getNestedKey("avatar", element),
                  description: getNestedKey("personality", element),
                  subtitle: (
                    <Box mt={0.5} mb={1}>
                      {getNpcSubtitle({
                        flavor: { class: element.class },
                        stats: { race: element.race },
                      })}
                    </Box>
                  ),
                })}
                loading={isLoading}
                fetchFrom={`/campaigns/${campaign._id}/npcs`}
                src={"/npcs/{ID}"}
                onEdit={(id) => Router.push(`/npcs/add/${id}`)}
                onDelete={() => {}}
                headerProps={{
                  onAdd: () => Router.push("/npcs/add"),
                }}
              />
            </Box>
          )}
          {value === 1 && (
            <Box
              component="div"
              role="tabpanel"
              hidden={value !== 1}
              id={`simple-tabpanel-${1}`}
              aria-labelledby={`simple-tab-${1}`}
            >
              <PaginatedTable
                getRowData={(element) => ({
                  _id: getNestedKey("_id", element),
                  id: getNestedKey("id", element),
                  name: getNestedKey("name", element),
                  avatar: getNestedKey("avatar", element),
                  description: getNestedKey("personality", element),                  
                })}
                loading={isLoading}
                fetchFrom={`/campaigns/${campaign._id}/monsters`}
                src={"/bestiary/{ID}"}
                onEdit={(id) => Router.push(`/bestiary/add/${id}`)}
                onDelete={() => {}}
                headerProps={{
                  onAdd: () => Router.push("/bestiary/add"),
                }}
              />
            </Box>
          )}
        </Container>
      </Grid>
    </Grid>
  );
}
