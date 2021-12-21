import { Tabs, Box, Tab, Typography, useTheme, Container as MuiContainer, Button } from "@mui/material";
import { useState } from "react";
import { Container, Layout } from "components";
import { Details, Class, Stats, Proficiencies, Abilities } from "components/CharacterCreation";
import {
  MuscleUp as MuscleUpIcon,
  Juggler as JugglerIcon,
  SpellBolt as SpellBoltIcon,
  Character as CharacterIcon,
  SwordShield as SwordShieldIcon,
} from "components/icons";
import { StringUtil } from "helpers/string-util";
import character_template from "helpers/json/character_template.json";
import Api from "helpers/api";
import jwt from "next-auth/jwt";
import Head from "next/head";
import { useRouter } from "next/router";

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
  { label: "Detalles", Icon: CharacterIcon, Component: Details },
  // { label: "Clase", Icon: SwordShieldIcon, Component: Class },
  { label: "Estadísticas", Icon: MuscleUpIcon, Component: Stats },
  { label: "Proficiencias", Icon: JugglerIcon, Component: Proficiencies },
  { label: "Habilidades", Icon: SpellBoltIcon, Component: Abilities },
];

export default function AddNpc({ npc }) {
  const theme = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const { commoner } = character_template;
  const [creature, setCreature] = useState({ ...(npc ?? commoner) });
  const colors = {
    active: theme.palette.secondary.main,
    inactive: theme.palette.action.active,
  };

  const handleStepChange = (_, newValue) => {
    setActiveStep(newValue);
  };

  const handleCreatureChange = (key, value) => {
    setCreature({ ...StringUtil.setNestedKey(key, creature, value) });
  };

  const handleSubmit = () => {
    Api.fetchInternal(`/npc`, {
      method: creature._id ? "PUT" : "POST",
      body: JSON.stringify(creature),
    }).then(() => router.back());
  };

  return (
    <Layout>
      <Head>
        <title>Lierno App | Crear NPC</title>
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
              {tabs.map(({ label, Icon }, index) => (
                <Tab
                  key={index}
                  label={label}
                  icon={<Icon color={activeStep === index ? colors.active : colors.inactive} size={28} />}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          <MuiContainer maxWidth="xs" sx={{ width: "75%" }}>
            {tabs.map(({ Component }, index) => (
              <TabPanel key={index} value={activeStep} index={index}>
                <Component creature={creature} setCreature={handleCreatureChange} />
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

  let npc = null;

  if (!!query.id && query.id.length > 0) {
    npc = await Api.fetchInternal("/npc/" + query.id[0], {
      headers,
    }).catch(() => null);
  }

  return {
    props: {
      npc,
    },
  };
}
