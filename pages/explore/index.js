import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { Container, Layout, Metadata } from "components";
import { Table } from "components/Table";
import references from "helpers/json/references.json";
import { useQueryState } from "hooks/useQueryState";
import { getToken } from "next-auth/jwt";
import Api from "services/api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

export default function ExplorePage({ items, spells }) {
  const [tabValue, setTabValue] = useQueryState("category", 0, "number");
  const [itemTabValue, setItemTabValue] = useQueryState("item", 0, "number");
  const [spellTabValue, setSpellTabValue] = useQueryState("spell", 0, "number");
  const [referenceTabValue, setReferenceTabValue] = useQueryState("reference", 0, "number");
  const itemLabels = {
    armor: "Armadura",
    items: "Objetos",
    weapons: "Armas",
    vehicles: "Vehículos",
    magicItems: "Objetos mágicos",
    magicWeapons: "Armas mágicas",
    magicArmor: "Armadura mágica",
  };
  const referenceLabels = {
    action: "Acciones",
    bonus_action: "Acciones adicionales",
    condition: "Condiciones",
    environment: "Ambientales",
    rest: "Descanso",
    movement: "Movimiento",
    optional: "Opcionales",
    reaction: "Reacciones",
  };

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  const handleItemTabValue = (_, newValue) => setItemTabValue(newValue);

  const handleSpellTabValue = (_, newValue) => setSpellTabValue(newValue);

  const handleReferenceTabValue = (_, newValue) => setReferenceTabValue(newValue);

  return (
    <Layout>
      <Metadata title={"Explorar | Lierno App"} description={"Explora información sobre D&D."} />
      <Container noPadding>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          value={tabValue}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab id="explore-tabpanel-0" aria-controls="explore-tabpanel-0" label="Objetos" />
          <Tab id="explore-tabpanel-1" aria-controls="explore-tabpanel-1" label="Hechizos" />
          <Tab id="explore-tabpanel-2" aria-controls="explore-tabpanel-2" label="Referencia rápida" />
        </Tabs>
        <Divider />
        <TabPanel value={tabValue} index={0}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            value={itemTabValue}
            onChange={handleItemTabValue}
            aria-label="item tabs"
          >
            {Object.keys(items).map((key, index) => (
              <Tab
                key={key}
                id={`item-tabpanel-${index}`}
                aria-controls={`item-tabpanel-${index}`}
                label={itemLabels[key]}
              />
            ))}
          </Tabs>
          <Divider />
          {Object.keys(items).map((key, index) => (
            <TabPanel key={key} value={itemTabValue} index={index}>
              <Table
                schema={{
                  _id: "_id",
                  name: "name",
                  description: "description",
                  avatar: "image.small",
                }}
                src={"/item/{ID}"}
                data={items[key]}
              />
            </TabPanel>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            value={spellTabValue}
            onChange={handleSpellTabValue}
            aria-label="spell tabs"
          >
            {Object.keys(spells).map((key, index) => (
              <Tab
                key={key}
                id={`spell-tabpanel-${index}`}
                aria-controls={`spell-tabpanel-${index}`}
                label={key === "0" ? "Trucos" : `Nivel ${key}`}
              />
            ))}
          </Tabs>
          <Divider />
          {Object.keys(spells).map((key, index) => (
            <TabPanel key={key} value={spellTabValue} index={index}>
              <Table
                schema={{
                  _id: "_id",
                  name: "name",
                  description: "stats.description",
                }}
                src={"/spell/{ID}"}
                data={spells[key]}
              />
            </TabPanel>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            value={referenceTabValue}
            onChange={handleReferenceTabValue}
            aria-label="reference tabs"
          >
            {Object.keys(references).map((key, index) => (
              <Tab
                key={key}
                id={`reference-tabpanel-${index}`}
                aria-controls={`reference-tabpanel-${index}`}
                label={referenceLabels[key]}
              />
            ))}
          </Tabs>
          <Divider />
          {Object.keys(references).map((key, index) => (
            <TabPanel key={key} value={referenceTabValue} index={index}>
              <Table
                schema={{
                  _id: "title",
                  name: "title",
                  subtitle: "subtitle",
                  description: "description",
                }}
                src={"/reference/{ID}"}
                data={references[key]}
              />
            </TabPanel>
          ))}
        </TabPanel>
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

  let items = {};

  await Api.fetchInternal("/items")
    .then((apiItems) => {
      apiItems.forEach((item) => {
        items[item.type] = [...(items[item.type] ?? []), item];
      });
    })
    .catch(() => null);

  let spells = {};

  await Api.fetchInternal("/spells", { headers })
    .then((apiSpells) => {
      for (const spell of apiSpells) {
        spells[spell.stats.level] = [...(spells[spell.stats.level] ?? []), spell];
      }
    })
    .catch(() => null);

  return {
    props: {
      items,
      spells,
    },
  };
}
