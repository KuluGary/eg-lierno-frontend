import { Tabs, Box, Tab, Typography, useTheme, Container as MuiContainer, Button } from "@mui/material";
import { useState } from "react";
import { Container, Layout } from "components";
import { Details, Stats, Proficiencies, Abilities, Equipment } from "components/CharacterCreation";
import {
  MuscleUp as MuscleUpIcon,
  Juggler as JugglerIcon,
  SpellBolt as SpellBoltIcon,
  Character as CharacterIcon,
  Backpack as BackpackIcon,
} from "components/icons";
import { StringUtil } from "helpers/string-util";
import creature_template from "helpers/json/creature_template.json";
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
  { label: "Estadísticas", Icon: MuscleUpIcon, Component: Stats },
  { label: "Proficiencias", Icon: JugglerIcon, Component: Proficiencies },
  { label: "Habilidades", Icon: SpellBoltIcon, Component: Abilities },
  { label: "Equipamiento", Icon: BackpackIcon, Component: Equipment },
];

export default function AddNpc({ npcId, npc, spells, classes, items }) {
  const theme = useTheme();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const commoner = creature_template;
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
      method: npcId ? "PUT" : "POST",
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
                <Component creature={creature} setCreature={handleCreatureChange} spells={spells} items={items} classes={classes} />
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

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true,
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  let npc = null;
  let npcId = null;
  let spells = null;

  if (!!query?.id && query?.id?.length > 0) {
    npcId = query.id[0];
    npc = await Api.fetchInternal("/npcs/" + query.id[0], {
      headers,
    }).catch(() => null);

    if (npc?.stats.spells?.length > 0) {
      const spellIds = npc.stats.spells.map((spell) => spell.spellId);

      spells = await Api.fetchInternal("/spells", {
        method: "POST",
        body: JSON.stringify(spellIds),
        headers,
      });
    }
  }

  const items = await Api.fetchInternal("/items", {
    headers,
  }).catch(() => null);

  const classes = await Api.fetchInternal("/classes/", {
    headers,
  }).catch(() => null);

  return {
    props: {
      npc,
      npcId,
      items,
      classes,
    },
  };
}
