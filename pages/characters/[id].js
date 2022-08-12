import { getOperatorString, isArrayNotEmpty } from "@lierno/core-helpers";
import {
  getAbilitiesString,
  getAttackStrings,
  getGenderedClass,
  getModifier,
  getPassivePerception,
  getProficiencyBonus,
  getSavingThrowString,
  getSpeedString,
  getStatBonus,
} from "@lierno/dnd-helpers";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Layout, Metadata } from "components";
import { CreatureMenu } from "components/CreatureMenu/CreatureMenu";
import { CreatureFlavor, CreatureStats } from "components/CreatureProfile";
import download from "downloadjs";
import Api from "services/api";
import { useWidth } from "hooks/useWidth";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CharacterProfile({ character, spells, items, tier, classes }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { data: session } = useSession();
  const theme = useTheme();
  const width = useWidth();

  const downloadPdf = () => {
    setIsDownloading(true);
    Api.fetchInternal("/characters/sheet/pdf/" + character["_id"])
      .then((base64Url) => download(base64Url, `${character["name"]}.pdf`, "application/pdf"))
      .catch((err) => toast.error(err))
      .finally(() => setIsDownloading(false));
  };

  const createStringDefinition = (charClass) => {
    let classes = "";

    if (charClass.length > 0) {
      classes = charClass
        .map((charClasses) => {
          const classString =
            getGenderedClass(charClasses["className"], character.flavor.traits.pronoun) +
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
      classes = `${getGenderedClass("Novato", character.flavor.pronoun)} nivel 0`;
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
      <Grid container spacing={1} sx={{ height: "100%" }}>
        <Grid item laptop={6} mobile={12}>
          <CreatureFlavor
            containerStyle={{
              height: width.down("tablet") ? "100%" : "90vh",
              overflowY: width.down("tablet") ? "no-scroll" : "scroll",
              ...theme.mixins.noScrollbar,
            }}
            data={{
              id: character._id,
              sections: [
                {
                  title: "Personalidad",
                  content: character?.flavor.personality,
                },
                { title: "Apariencia", content: character?.flavor.appearance },
                { title: "Historia", content: character?.flavor.backstory },
              ],
              image: character?.flavor.portrait?.original,
              tier,
              type: "character",
            }}
            Header={() => (
              <Box
                data-testid="creature-header"
                component="main"
                sx={{
                  display: "flex",
                  flexDirection: width.down("tablet") ? "column" : "row",
                  gap: "1em",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: "1em 1.2em",
                }}
              >
                <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ textAlign: width.down("tablet") ? "center" : "left" }}>
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
                  <CreatureMenu creature={character} type="character" downloadPdf={downloadPdf} />
                )}
              </Box>
            )}
          />
        </Grid>
        <Grid item laptop={6} mobile={12} sx={{ paddingBottom: width.down("tablet") ? "1em" : 0 }}>
          <CreatureStats
            containerStyle={{
              height: width.down("tablet") ? "100%" : "90vh",
              overflowY: width.down("tablet") ? "no-scroll" : "scroll",
              paddingBottom: width.down("tablet") ? "1em" : 0,
              ...theme.mixins.noScrollbar,
            }}
            data={{
              character: character,
              classes: character["stats"]["classes"],
              stats: character["stats"]["abilityScores"],
              proficiencyBonus: character["stats"]["proficiencyBonus"],
              dataClasses: classes,
              proficiencies: [
                {
                  key: "hitPoints",
                  title: "Puntos de vida",
                  content: `${character.stats.hitPoints.current ?? character.stats.hitPoints.max} / ${
                    character.stats.hitPoints.max
                  } (${character.stats.classes
                    .map((charClass) => `${charClass.classLevel}d${charClass.hitDie}`)
                    .join(", ")} + ${getModifier(character.stats.abilityScores.constitution)})`,
                },
                {
                  key: "armorClass",
                  title: "Clase de armadura",
                  content: `${getStatBonus("stats.armorClass", character, "stats.armorClass")?.total} (${
                    isArrayNotEmpty(character.stats.equipment.armor)
                      ? character.stats.equipment.armor
                          .filter((armor) => armor.equipped)
                          .map((armor) => items.find((item) => item.id === armor.id)?.name?.toLowerCase())
                          .join(", ")
                      : "sin armadura"
                  })`,
                },
                {
                  key: "proficiencyBonus",
                  title: "Bonificador de competencia",
                  content: getProficiencyBonus(character),
                },
                {
                  key: "speed",
                  title: "Velocidad",
                  content: getSpeedString(character.stats.speed),
                },
                {
                  key: "savingThrows",
                  title: "Tiradas de salvación con competencia",
                  content: getSavingThrowString(character),
                },
                {
                  key: "skills",
                  title: "Habilidades con competencia",
                  content: getAbilitiesString(character),
                },
                {
                  key: "senses",
                  title: "Sentidos",
                  content: `Percepción pasiva ${getPassivePerception(
                    character
                  )}, bono de Iniciativa ${getOperatorString(
                    getModifier(getStatBonus("initiativeBonus", character, "stats.abilityScores.dexterity")?.total)
                  )}`,
                },
              ],
              abilities: [
                { title: "Ataques", content: getAttackStrings(character) },
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

    spells = await Api.fetchInternal(`/spells?id=${JSON.stringify(spellIds.map((spell) => spell.spellId))}`, {
      headers,
    });
  }

  const classes = await Api.fetchInternal("/classes/", {
    headers,
  }).catch(() => null);

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

  let tier = null;

  if (!!character?.flavor.group) {
    tier = await Api.fetchInternal(`/tier-by-creature?type=character&id=${character.flavor.group}`, {
      headers,
    })
      .then((res) => res.map((el) => el._id))
      .catch(() => null);
  }

  return {
    props: {
      character,
      spells,
      items,
      tier,
      classes,
    },
  };
}
