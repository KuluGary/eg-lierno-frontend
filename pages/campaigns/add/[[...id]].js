import { Tabs, Box, Tab, Typography, useTheme, Container as MuiContainer, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Container, Layout } from "components";
import { StringUtil } from "helpers/string-util";
import Api from "helpers/api";
import jwt from "next-auth/jwt";
import Head from "next/head";
import { useRouter } from "next/router";
import { Details, Discord, Map } from "components/CampaignCreation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabs = [
  { label: "Detalles", Component: Details },
  { label: "Mapa", Component: Map },
   { label: "Discord", Component: Discord },
];

export default function AddCampaign({ campaignData }) {
  const theme = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [campaign, setCampaign] = useState({ ...(campaignData ?? {}) });

  useEffect(() => {
      Api.fetchInternal("/auth/me").then(res => handleCampaignChange("dm", res._id))
  }, [handleCampaignChange])

  const handleStepChange = (_, newValue) => {
    setActiveStep(newValue);
  };

  const handleCampaignChange = (key, value) => {
    setCampaign({ ...StringUtil.setNestedKey(key, campaign, value) });
  };

  const handleSubmit = () => {
    Api.fetchInternal(`/npc`, {
      method: campaign._id ? "PUT" : "POST",
      body: JSON.stringify(campaign),
    }).then(() => router.back());
  };

  return (
    <Layout>
      <Head>
        <title>Lierno App | Crear Campaña</title>
      </Head>
      <Container noPadding sx={{ maxWidth: "75%", margin: "0 auto" }}>
        <Box sx={{ width: "100%" }}>
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
              {tabs.map(({ label }, index) => (
                <Tab
                  key={index}
                  label={label}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          <MuiContainer maxWidth="xs" sx={{ width: "75%" }}>
             {tabs.map(({ Component }, index) => (
              <TabPanel value={activeStep} key={index}>
                <Component campaign={campaign} setCampaign={handleCampaignChange} />
              </TabPanel>
            ))} 
            <Box sx={{ m: 3, float: "right" }}>
              <Button sx={{ marginInline: 1 }}>Cancelar</Button>
              <Button sx={{ marginInline: 1 }} color="secondary" variant="outlined" onClick={handleSubmit}>
                Guardar
              </Button>
            </Box>
          </MuiContainer>
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
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

  let campaignData = null;

  if (!!query.id && query.id.length > 0) {
    campaignData = await Api.fetchInternal("/campaigns/" + query.id[0], {
      headers,
    }).catch(() => null);
  }

  return {
    props: {
      campaignData,
    },
  };
}
