import Head from "next/head";
import { Typography, Box, IconButton, Divider, Grid } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, FileDownload as FileDownloadIcon } from "@mui/icons-material";
import { CreatureFlavor, CreatureStats } from "components/CreatureProfile";
import { Layout } from "components";
import { StringUtil } from "helpers/string-util";
import { useTheme } from "@mui/material/styles";
import Api from "helpers/api";
import jwt from "next-auth/jwt";
import { CreatureCalculations } from "helpers/creature-calculations";
import Router from "next/router";

export default function NpcProfile({ npc, spells }) {
  const theme = useTheme();

  return (
    <Layout>
      <Head>
        <title>{npc?.name + " | Lierno App"}</title>
      </Head>
      <Grid container spacing={1} sx={{ height: "100%" }}>
        <Grid item laptop={6} tablet={12}>
          <CreatureFlavor
            containerStyle={{
              height: "90vh",
              overflowY: "scroll",
              ...theme.mixins.noScrollbar
            }}
            data={{
              sections: [
                { title: "Personalidad", content: npc?.flavor.personality },
                { title: "Apariencia", content: npc?.flavor.appearance },
                { title: "Historia", content: npc?.flavor.backstory },
              ],
              image: npc?.flavor.portrait?.original,
            }}
            Header={() => (
              <Box
                component="main"
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingInline: "1em" }}
              >
                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h5" component="h1">
                      {npc?.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {[npc.flavor.class, npc.stats.race, npc.stats.alignment]
                        .filter((el) => el && el.length > 0)
                        .map((el, i) => (i > 0 ? el.toLowerCase() : el))
                        .join(", ")}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", height: "100%" }}>
                  <Box component="div" sx={{ margin: "0 .25em" }}>
                    <IconButton
                      color="secondary"
                      sx={{
                        border: "1px solid rgba(63, 176, 172, 0.5);",
                        borderRadius: "8px",
                        padding: ".25em",
                        transition: theme.transitions.create(["border"], {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.leavingScreen,
                        }),
                        "&:hover": {
                          border: "1px solid rgba(63, 176, 172, 1);",
                        },
                      }}
                    >
                      <EditIcon onClick={() => Router.push(`/npcs/add/${npc._id}`)} fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box component="div" sx={{ margin: "0 .25em" }}>
                    <IconButton
                      color="secondary"
                      sx={{
                        border: "1px solid rgba(63, 176, 172, 0.5);",
                        borderRadius: "8px",
                        padding: ".25em",
                        transition: theme.transitions.create(["border"], {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.leavingScreen,
                        }),
                        "&:hover": {
                          border: "1px solid rgba(63, 176, 172, 1);",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box component="div" sx={{ margin: "0 .25em" }}>
                    <IconButton
                      color="secondary"
                      sx={{
                        border: "1px solid rgba(63, 176, 172, 0.5);",
                        borderRadius: "8px",
                        padding: ".25em",
                        transition: theme.transitions.create(["border"], {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.leavingScreen,
                        }),
                        "&:hover": {
                          border: "1px solid rgba(63, 176, 172, 1);",
                        },
                      }}
                    >
                      <FileDownloadIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}
          />
        </Grid>
        <Grid item laptop={6} tablet={12}>
          <CreatureStats
            containerStyle={{
              height: "90vh",
              overflowY: "scroll",
              ...theme.mixins.noScrollbar
            }}
            data={{
              stats: npc["stats"]["abilityScores"],
              proficiencyBonus: npc["stats"]["proficiencyBonus"],
              proficiencies: [
                {
                  title: "Puntos de vida",
                  content: `${npc["stats"]["hitPoints"]["max"]} (${npc["stats"]["hitDie"]["num"]}d${
                    npc["stats"]["hitDie"]["size"]
                  } ${StringUtil.getOperatorString(
                    CreatureCalculations.modifier(npc["stats"]["abilityScores"]["constitution"]) *
                      npc["stats"]["hitDie"]["num"]
                  )})`,
                },
                {
                  title: "Clase de armadura",
                  content: `${npc["stats"]["armorClass"]} (${npc["stats"]["armorType"] ?? ""})`,
                },
                { title: "Velocidad", content: CreatureCalculations.getSpeedString(npc.stats.speed) },
                {
                  title: "Tiradas de salvación con competencia",
                  content: CreatureCalculations.getSavingThrowString(
                    npc.stats.abilityScores,
                    npc.stats.savingThrows,
                    npc.stats.proficiencyBonus
                  ),
                },
                {
                  title: "Habilidades con competencia",
                  content: CreatureCalculations.getAbilitiesString(
                    npc["stats"]["abilityScores"],
                    npc["stats"]["skills"],
                    npc["stats"]["proficiencyBonus"]
                  ),
                },
                {
                  title: "Sentidos",
                  content: npc["stats"]["senses"].join(", "),
                },
                {
                  title: "Vulnerabilidades al daño",
                  content: npc["stats"]["damageVulnerabilities"].join(", "),
                },
                {
                  title: "Resistencias al daño",
                  content: npc["stats"]["damageResistances"].join(", "),
                },
                {
                  title: "Inmunidades al daño",
                  content: npc["stats"]["damageImmunities"].join(", "),
                },
                {
                  title: "Inmunidades a la condición",
                  content: npc["stats"]["conditionImmunities"].join(", "),
                },
                {
                  title: "Valor de desafío",
                  content: `${npc["stats"]["challengeRating"]} (${CreatureCalculations.getExperienceByCr(
                    npc["stats"]["challengeRating"]
                  )} puntos de experiencia)`,
                },
              ],
              abilities: [
                { title: "Ataques", content: npc["stats"]["attacks"] },
                { title: "Acciones", content: npc["stats"]["actions"] },
                { title: "Reacciones", content: npc["stats"]["reactions"] },
                { title: "Habilidades", content: npc["stats"]["additionalAbilities"] },
                {
                  title: "Hechizos",
                  content:
                    npc.stats.spells?.length > 0
                      ? { characterSpells: npc.stats.spells, spellData: spells }
                      : null,
                },
                { title: "Acciones legendarias", content: npc["stats"]["legendaryActions"] },
                { title: "Objetos", content: npc["stats"]["items"] },
              ],
            }}
          />
        </Grid>
      </Grid>
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

  const npc = await Api.fetchInternal("/npc/" + query.id, {
    headers,
  });
  let spells = null;

  if (!!npc.stats.spells && npc.stats.spells.length > 0) {
    const spellIds = [];

    npc.stats.spells.forEach((spellcasting) => {
      Object.values(spellcasting.spells || {})?.forEach((spellLevel) => {
        spellIds.push(...spellLevel);
      });
    });

    spells = await Api.fetchInternal("/spells", {
      method: "POST",
      body: JSON.stringify(spellIds.map((spell) => spell.spellId)),
      headers,
    });
  }

  return {
    props: {
      npc,
      spells
    },
  };
}
