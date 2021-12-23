import Head from "next/head";
import { Typography, Box, IconButton, Divider, Grid } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, FileDownload as FileDownloadIcon } from "@mui/icons-material";
import { CreatureFlavor, CreatureStats } from "components/CreatureProfile";
import { Layout, Metadata } from "components";
import { StringUtil } from "helpers/string-util";
import { useTheme } from "@mui/material/styles";
import Api from "helpers/api";
import Router from "next/router";
import jwt from "next-auth/jwt";
import { CreatureCalculations } from "helpers/creature-calculations";
import download from "downloadjs";

export default function CharacterProfile({ character, spells, items }) {
  const theme = useTheme();

  const downloadPdf = () => {
    Api.fetchInternal("/characters/sheet/pdf/" + character["_id"])
      .then((base64Url) => download(base64Url, `${character["name"]}.pdf`, "application/pdf"))
      .catch((err) => toast.error(err));
  };

  const createStringDefinition = (charClass) => {
    let classes = "";

    if (charClass.length > 0) {
      classes = charClass
        .map((charClasses) => {
          const classString =
            StringUtil.generizaClase(charClasses["className"], character.flavor.traits.pronoun) +
            " nivel " +
            charClasses["classLevel"];
          let subclassString = "";

          if (charClasses["subclassName"]) {
            subclassString = `( ${charClasses["subclassName"]} )`;
          }

          return classString + " " + subclassString;
        })
        .join(" / ");
    } else {
      classes = `${StringUtil.generizaClase("Novato", character.flavor.pronoun)} nivel 0`;
    }

    return classes;
  };

  return (
    <Layout>
      <Metadata
        title={(character?.name ?? "") + " | Lierno App"}
        image={character?.flavor.portrait?.avatar}
        description={character?.flavor.personality}
      />
      <Grid container spacing={1} sx={{ height: "99%" }}>
        <Grid item laptop={6} tablet={12}>
          <CreatureFlavor
            containerStyle={{
              height: "90vh",
              overflowY: "scroll",
              ...theme.mixins.noScrollbar,
            }}
            data={{
              sections: [
                { title: "Personalidad", content: character.flavor.personality },
                { title: "Apariencia", content: character.flavor.appearance },
                { title: "Historia", content: character.flavor.backstory },
              ],
              image: character.flavor.portrait?.original,
            }}
            Header={() => (
              <Box
                component="main"
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "1em" }}
              >
                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h5" component="h1">
                      {character?.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {character.stats.race?.name + ", "}
                      {createStringDefinition(character.stats.classes)}
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
                      <EditIcon onClick={() => Router.push(`/characters/add/${character._id}`)} fontSize="small" />
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
                      onClick={downloadPdf}
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
              classes: character["stats"]["classes"],
              stats: character["stats"]["abilityScores"],
              proficiencyBonus: character["stats"]["proficiencyBonus"],
              proficiencies: [
                { title: "Clase de armadura", content: character.stats.armorClass },
                {
                  title: "Puntos de vida",
                  content: `${character.stats.hitPoints.current ?? character.stats.hitPoints.max} / ${
                    character.stats.hitPoints.max
                  } (${character.stats.classes
                    .map((charClass) => `${charClass.classLevel}d${charClass.hitDie}`)
                    .join(", ")} + ${CreatureCalculations.modifier(character.stats.abilityScores.constitution)})`,
                },
                { title: "Velocidad", content: CreatureCalculations.getSpeedString(character.stats.speed) },
                {
                  title: "Tiradas de salvación con competencia",
                  content: CreatureCalculations.getSavingThrowString(
                    character.stats.abilityScores,
                    character.stats.savingThrows,
                    character.stats.proficiencyBonus
                  ),
                },
                {
                  title: "Habilidades con competencia",
                  content: CreatureCalculations.getAbilitiesString(
                    character.stats.abilityScores,
                    character.stats.skills,
                    character.stats.proficiencyBonus
                  ),
                },
                {
                  title: "Sentidos",
                  content: `Percepción pasiva ${CreatureCalculations.getPassivePerception(
                    character.stats
                  )}, bono de Iniciativa ${StringUtil.getOperatorString(character.stats.initiativeBonus)}`,
                },
              ],
              abilities: [
                { title: "Ataques", content: character.stats.attacks },
                { title: "Acciones", content: [...character.stats.actions, ...character.stats.bonusActions] },
                { title: "Reacciones", content: character.stats.reactions },
                {
                  title: "Habilidades",
                  content: character.stats.additionalAbilities,
                },
                {
                  title: "Hechizos",
                  content:
                    character.stats.spells?.length > 0
                      ? { characterSpells: character.stats.spells, spellData: spells }
                      : null,
                },
                { title: "Objetos", content: items },
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

  const character = await Api.fetchInternal("/characters/" + query.id, {
    headers,
  });

  let spells = null;
  let items = [];

  if (!!character.stats.spells && character.stats.spells.length > 0) {
    const spellIds = [];

    character.stats.spells.forEach((spellcasting) => {
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

  if (!!character.stats.equipment) {
    const objects = [];

    for (const key in character.stats.equipment || {}) {
      const element = character.stats.equipment[key];

      if (Array.isArray(element)) {
        objects.push(...element.map((i) => i.id));
      }
    }

    items = await Api.fetchInternal("/items", {
      method: "POST",
      body: JSON.stringify(objects),
    });

    items = items.map(({ _id, name, description }) => {
      return {
        id: _id,
        name,
        description,
      };
    });
  }

  return {
    props: {
      character,
      spells,
      items,
    },
  };
}
