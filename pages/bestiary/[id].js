import Head from "next/head";
import { Typography, Box, IconButton, Divider, Grid } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, FileDownload as FileDownloadIcon } from "@mui/icons-material";
import { CreatureFlavor, CreatureStats } from "components/CreatureProfile";
import { Layout, Metadata } from "components";
import { StringUtil } from "helpers/string-util";
import { useTheme } from "@mui/material/styles";
import Api from "helpers/api";
import { getToken } from "next-auth/jwt";
import { CreatureCalculations } from "helpers/creature-calculations";
import Router from "next/router";

export default function MonsterProfile({ monster, spells }) {
  const theme = useTheme();

  return (
    <Layout>
      <Metadata />
      <Grid container spacing={1} sx={{ height: "100%" }}>
        <Grid item laptop={6} tablet={12}>
          <CreatureFlavor
            containerStyle={{
              height: "90vh",
              overflowY: "scroll",
              ...theme.mixins.noScrollbar,
            }}
            data={{
              sections: [{ title: "Descripción", content: monster?.flavor.description }],
              image: monster?.flavor.portrait?.original,
            }}
            Header={() => (
              <Box
                component="main"
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingInline: "1em" }}
              >
                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h5" component="h1">
                      {monster?.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {[monster.flavor.class, monster.stats.race, monster.stats.alignment]
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
                      <EditIcon onClick={() => Router.push(`/monsters/add/${monster._id}`)} fontSize="small" />
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
              ...theme.mixins.noScrollbar,
            }}
            data={{
              character: monster,
              stats: monster["stats"]["abilityScores"],
              proficiencyBonus: monster["stats"]["proficiencyBonus"],
              proficiencies: [
                {
                  title: "Puntos de vida",
                  content: `${monster["stats"]["hitPoints"]["max"]} (${monster["stats"]["hitDie"]["num"]}d${
                    monster["stats"]["hitDie"]["size"]
                  } ${StringUtil.getOperatorString(
                    CreatureCalculations.modifier(monster["stats"]["abilityScores"]["constitution"]) *
                      monster["stats"]["hitDie"]["num"]
                  )})`,
                },
                {
                  title: "Clase de armadura",
                  content: `${monster["stats"]["armorClass"]} (${monster["stats"]["armorType"] ?? ""})`,
                },
                { title: "Velocidad", content: CreatureCalculations.getSpeedString(monster.stats.speed) },
                {
                  title: "Tiradas de salvación con competencia",
                  content: CreatureCalculations.getSavingThrowString(
                    monster.stats.abilityScores,
                    monster.stats.savingThrows,
                    monster.stats.proficiencyBonus
                  ),
                },
                {
                  title: "Habilidades con competencia",
                  content: CreatureCalculations.getAbilitiesString(
                    monster["stats"]["abilityScores"],
                    monster["stats"]["skills"],
                    monster["stats"]["proficiencyBonus"]
                  ),
                },
                {
                  title: "Sentidos",
                  content: monster["stats"]["senses"].join(", "),
                },
                {
                  title: "Vulnerabilidades al daño",
                  content: monster["stats"]["damageVulnerabilities"].join(", "),
                },
                {
                  title: "Resistencias al daño",
                  content: monster["stats"]["damageResistances"].join(", "),
                },
                {
                  title: "Inmunidades al daño",
                  content: monster["stats"]["damageImmunities"].join(", "),
                },
                {
                  title: "Inmunidades a la condición",
                  content: monster["stats"]["conditionImmunities"].join(", "),
                },
                {
                  title: "Valor de desafío",
                  content: `${monster["stats"]["challengeRating"]} (${CreatureCalculations.getExperienceByCr(
                    monster["stats"]["challengeRating"]
                  )} puntos de experiencia)`,
                },
              ],
              abilities: [
                { title: "Ataques", content: monster["stats"]["attacks"] },
                { title: "Acciones", content: monster["stats"]["actions"] },
                { title: "Reacciones", content: monster["stats"]["reactions"] },
                { title: "Habilidades", content: monster["stats"]["additionalAbilities"] },
                {
                  title: "Hechizos",
                  content:
                    monster.stats.spells?.length > 0
                      ? { characterSpells: monster.stats.spells, spellData: spells }
                      : null,
                },
                { title: "Acciones legendarias", content: monster["stats"]["legendaryActions"] },
                { title: "Objetos", content: monster["stats"]["items"] },
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

  const token = await getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true,
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const monster = await Api.fetchInternal("/bestiary/" + query.id, {
    headers,
  });
  let spells = null;

  if (!!monster.stats.spells && monster.stats.spells.length > 0) {
    const spellIds = [];

    monster.stats.spells.forEach((spellcasting) => {
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
      monster,
      spells,
    },
  };
}
