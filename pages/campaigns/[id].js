import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Container, Layout, Metadata } from "components";
import {
  CampaignCreatures,
  CampaignDetails,
  CampaignDiary,
  CampaignFactions,
  CampaignLogs,
  CampaignMap
} from "components/CampaignProfile";
import { useQueryState } from "hooks/useQueryState";
import { getToken } from "next-auth/jwt";
import Api from "services/api";

const tabs = [
  { label: "Detalles", Component: CampaignDetails },
  { label: "Diario", Component: CampaignDiary },
  { label: "Criaturas", Component: CampaignCreatures },
  { label: "Facciones", Component: CampaignFactions },
  { label: "Mapa", Component: CampaignMap },
  { label: "Historial", Component: CampaignLogs },
  // { label: "Tablero", Component: CampaignTabletop },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  if (value !== index) return null;

  return (
    <Grid
      item
      container
      spacing={2}
      laptop={12}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Grid>
  );
}

export default function CampaignProfile({ campaign, playerData = {}, characterData }) {
  // const [activeStep, setActiveStep] = useState(0);
  const [activeStep, setActiveStep] = useQueryState("step", 0, "number");
  const { players, dm } = playerData;
  const { characters } = characterData;

  const handleStepChange = (_, newValue) => {
    setActiveStep(newValue);
  };

  return (
    <Layout>
      <Metadata title={(campaign?.name ?? "") + " | Lierno App"} description={campaign?.flavor.synopsis} />
      <Grid container spacing={2}>
        <Grid item laptop={12}>
          <Container noPadding>
            <Box component="div" sx={{ p: 3 }}>
              <Typography component="h1" variant="h5">
                {campaign?.name}
              </Typography>
              <Typography component="subtitle">{campaign?.flavor?.game}</Typography>
            </Box>
            <Divider />
            <Tabs
              value={activeStep}
              variant="scrollable"
              scrollButtons={"auto"}
              onChange={handleStepChange}
              aria-label="basic tabs example"
              textColor="secondary"
              indicatorColor="secondary"
            >
              {tabs.map(({ label }, index) => (
                <Tab key={index} label={label} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Container>
        </Grid>
        {tabs.map(({ Component }, index) => (
          <TabPanel key={index} value={activeStep} index={index}>
            <Component campaign={campaign} players={players} dm={dm} characters={characters} />
          </TabPanel>
        ))}
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

  let playerData = null;
  let characterData = null;

  const campaign = await Api.fetchInternal("/campaigns/" + query.id, {
    headers,
  });

  if (campaign) {
    playerData = await Api.fetchInternal("/auth/players", {
      method: "POST",
      headers,
      body: JSON.stringify({
        dmId: campaign.dm,
        userIds: campaign.players,
      }),
    });

    characterData = await Api.fetchInternal("/characterinfo", {
      method: "POST",
      headers,
      body: JSON.stringify({ characterIds: campaign.characters }),
    });
  }

  return {
    props: {
      campaign,
      playerData,
      characterData,
    },
  };
}
