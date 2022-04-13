import {
  Code as CodeIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";
import { Box, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Layout, Metadata, Tooltip } from "components";
import { CreatureFlavor, CreatureStats } from "components/CreatureProfile";
import download from "downloadjs";
import Api from "helpers/api";
import { CreatureCalculations } from "helpers/creature-calculations";
import { ArrayUtil, StringUtil } from "helpers/string-util";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CharacterProfile({ character, spells, items }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { data: session } = useSession();
  const theme = useTheme();

  const downloadPdf = () => {
    setIsDownloading(true);
    Api.fetchInternal("/characters/sheet/pdf/" + character["_id"])
      .then((base64Url) => download(base64Url, `${character["name"]}.pdf`, "application/pdf"))
      .catch((err) => toast.error(err))
      .finally(() => setIsDownloading(false));
  };

  const downloadJson = () => {
    setIsDownloading(true);
    const charToDownload = { ...character };

    delete charToDownload._id;
    delete charToDownload.createdAt;
    delete charToDownload.createdBy;
    delete charToDownload.updatedAt;

    const stringToDownload = JSON.stringify(charToDownload);
    const bytes = new TextEncoder().encode(stringToDownload);
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8",
    });

    download(blob, `${charToDownload["name"]}.json`, "application/json");
    setIsDownloading(false);
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
                {
                  title: "Personalidad",
                  content: character.flavor.personality,
                },
                { title: "Apariencia", content: character.flavor.appearance },
                { title: "Historia", content: character.flavor.backstory },
              ],
              image: character.flavor.portrait?.original,
            }}
            Header={() => (
              <Box
                component="main"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: "1em",
                  position: " -webkit-sticky",
                  position: "sticky",
                  top: "-1px"
                }}
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
                {!!session && session?.userId === character.createdBy && (
                  <Box sx={{ display: "flex", height: "100%" }}>
                    <Box component="div" sx={{ margin: "0 .25em" }}>
                      <Tooltip title="Editar">
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
                      </Tooltip>
                    </Box>
                    <Box component="div" sx={{ margin: "0 .25em" }}>
                      <Tooltip title="Eliminar">
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
                      </Tooltip>
                    </Box>
                    <Box component="div" sx={{ margin: "0 .25em" }}>
                      <Tooltip title="Descargar en PDF">
                        <IconButton
                          color="secondary"
                          onClick={downloadPdf}
                          disabled={isDownloading}
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
                          {isDownloading ? (
                            <CircularProgress color="secondary" size={20} />
                          ) : (
                            <FileDownloadIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box component="div" sx={{ margin: "0 .25em" }}>
                      <Tooltip title="Descargar en JSON">
                        <IconButton
                          color="secondary"
                          onClick={downloadJson}
                          disabled={isDownloading}
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
                          {isDownloading ? (
                            <CircularProgress color="secondary" size={20} />
                          ) : (
                            <CodeIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                )}
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
              character: character,
              classes: character["stats"]["classes"],
              stats: character["stats"]["abilityScores"],
              proficiencyBonus: character["stats"]["proficiencyBonus"],
              proficiencies: [
                {
                  key: "hitPoints",
                  title: "Puntos de vida",
                  content: `${character.stats.hitPoints.current ?? character.stats.hitPoints.max} / ${
                    character.stats.hitPoints.max
                  } (${character.stats.classes
                    .map((charClass) => `${charClass.classLevel}d${charClass.hitDie}`)
                    .join(", ")} + ${CreatureCalculations.modifier(character.stats.abilityScores.constitution)})`,
                },
                {
                  key: "armorClass",
                  title: "Clase de armadura",
                  content: `${character.stats.armorClass} (${
                    ArrayUtil.isNotEmpty(character.stats.equipment.armor)
                      ? character.stats.equipment.armor
                          .filter((armor) => armor.equipped)
                          .map((armor) => items.find((item) => item.id === armor.id)?.name?.toLowerCase())
                          .join(", ")
                      : "sin armadura"
                  })`,
                },
                {
                  key: "speed",
                  title: "Velocidad",
                  content: CreatureCalculations.getSpeedString(character.stats.speed),
                },
                {
                  key: "savingThrows",
                  title: "Tiradas de salvación con competencia",
                  content: CreatureCalculations.getSavingThrowString(
                    character.stats.abilityScores,
                    character.stats.savingThrows,
                    character.stats.proficiencyBonus,
                    character
                  ),
                },
                {
                  key: "skills",
                  title: "Habilidades con competencia",
                  content: CreatureCalculations.getAbilitiesString(
                    character.stats.abilityScores,
                    character.stats.skills,
                    character.stats.proficiencyBonus,
                    character
                  ),
                },
                {
                  key: "senses",
                  title: "Sentidos",
                  content: `Percepción pasiva ${CreatureCalculations.getPassivePerception(
                    character.stats,
                    character
                  )}, bono de Iniciativa ${StringUtil.getOperatorString(
                    CreatureCalculations.modifier(
                      CreatureCalculations.getStatBonus("initiativeBonus", character, "stats.abilityScores.dexterity")
                    )
                  )}`,
                },
              ],
              abilities: [
                { title: "Ataques", content: character.stats.attacks },
                {
                  title: "Acciones",
                  content: [...character.stats.actions, ...character.stats.bonusActions],
                },
                { title: "Reacciones", content: character.stats.reactions },
                {
                  title: "Habilidades",
                  content: character.stats.additionalAbilities,
                },
                {
                  title: "Hechizos",
                  content:
                    character.stats.spells?.length > 0
                      ? {
                          characterSpells: character.stats.spells,
                          spellData: spells,
                        }
                      : null,
                },
                { title: "Objetos", content: items },
                {
                  title: "Trasfondo",
                  content: [character.flavor.background].map((back) => ({
                    ...back,
                    description: back.trait,
                  })),
                },
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

  const token = await getToken({ req, secret, raw: true }).catch((_) => null);

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
