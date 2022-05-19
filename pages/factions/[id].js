import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import { Avatar, Container, Layout, Metadata } from "components";
import { Table } from "components/Table";
import Api from "helpers/api";
import { getToken } from "next-auth/jwt";
import { useQueryState } from "hooks/useQueryState";
import { getInitials } from "@lierno/core-helpers";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FactionProfile({ faction, npcs }) {
  const [activeStep, setActiveStep] = useQueryState("step", 0, "number");

  const handleStepChange = (_, newValue) => setActiveStep(newValue);

  return (
    <Layout>
      <Metadata title={(faction?.name ?? "") + " | Lierno App"} description={faction?.description} />
      <Grid container spacing={2}>
        <Grid item laptop={12}>
          <Container noPadding>
            <Box component="div" sx={{ display: "flex", alignItems: "center", p: 3 }}>
              <Avatar src={faction?.image} fallBackText={getInitials(faction?.name ?? "")} size={45} />
              <Box component="div" sx={{ marginInline: 3 }}>
                {faction?.name}
              </Box>
            </Box>
            <Divider />
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeStep}
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleStepChange}
                aria-label="basic tabs example"
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label="NPCs" {...a11yProps(0)} />
              </Tabs>
            </Box>
            <Box
              component="div"
              role="tabpanel"
              hidden={activeStep !== 0}
              id={`simple-tabpanel-${0}`}
              aria-labelledby={`simple-tab-${0}`}
            >
              {!!npcs && (
                <Table
                  schema={{
                    _id: "_id",
                    name: "name",
                    avatar: "flavor.portrait.avatar",
                    description: "flavor.description",
                    owner: "createdBy",
                  }}
                  data={npcs}
                  src={"/npcs/{ID}"}
                  onEdit={(id) => Router.push(`/npcs/add/${id}`)}
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
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

  const faction = await Api.fetchInternal("/factions/" + query.id).catch(() => null);
  let npcs = null;

  if (!!faction) {
    npcs = await Api.fetchInternal("/factions/" + query.id + "/npcs").catch(() => null);
  }

  return {
    props: {
      faction,
      npcs,
    },
  };
}
