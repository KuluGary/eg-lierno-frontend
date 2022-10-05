import { getOperatorString } from "@lierno/core-helpers";
import {
  getAbilitiesString,
  getAttackStrings,
  getExperienceByCr,
  getInitiativeBonus,
  getModifier,
  getPassiveInvestigation,
  getPassivePerception,
  getSavingThrowString,
  getSpeedString,
} from "@lierno/dnd-helpers";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Layout, Metadata } from "components";
import { CreatureMenu } from "components/CreatureMenu/CreatureMenu";
import { CreatureFlavor, CreatureStats } from "components/CreatureProfile";
import download from "downloadjs";
import Api from "services/api";
import { ArrayUtil } from "helpers/string-util";
import { useWidth } from "hooks/useWidth";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";
import HitPoints from "components/CreatureProfile/CreatureStats/components/HitPoints/HitPoints";

export default function NpcProfile({ npc, spells, items, classes, tier }) {
  const { data: session } = useSession();
  const theme = useTheme();
  const width = useWidth();
  const [currentNpc, setCurrentNpc] = useState(npc);

  const downloadPdf = () => {
    Api.fetchInternal("/npc/sheet/pdf/" + npc["_id"])
      .then((base64Url) => download(base64Url, `${npc["name"]}.png`, "image/png"))
      .catch((err) => toast.error(err?.message));
  };

  const modifyHitPoints = (key, amount) => {
    const newNpc = { ...currentNpc };

    newNpc.stats.hitPoints[key] = amount;

    Api.fetchInternal("/npc", {
      method: "PUT",
      body: JSON.stringify(newNpc),
    }).then(() => setCurrentNpc(newNpc));
  };

  return (
    <Layout>
      <Metadata
        title={(currentNpc?.name ?? "") + " | Lierno App"}
        image={currentNpc?.flavor.portrait?.original}
        description={currentNpc?.flavor.personality}
      />
      <Head>
        <title>{currentNpc?.name + " | Lierno App"}</title>
      </Head>
      <Grid container spacing={1} sx={{ height: "100%" }}>
        <Grid item laptop={6} tablet={12}>
          <CreatureFlavor
            containerStyle={{
              height: width.down("tablet") ? "100%" : "90vh",
              overflowY: width.down("tablet") ? "no-scroll" : "scroll",
              ...theme.mixins.noScrollbar,
            }}
            data={{
              id: currentNpc._id,
              sections: [
                { title: "Personalidad", content: currentNpc?.flavor.personality },
                { title: "Apariencia", content: currentNpc?.flavor.appearance },
                { title: "Historia", content: currentNpc?.flavor.backstory },
              ],
              image: currentNpc?.flavor.portrait?.original,
              tier,
              type: "npc",
            }}
            Header={() => (
              <>
                <Box
                  data-testid="creature-header"
                  component="main"
                  sx={{
                    display: "flex",
                    gap: "1em",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "1em 1.2em",
                  }}
                >
                  <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography variant="h5" component="h1">
                        {npc?.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {[currentNpc.flavor.class, currentNpc.stats.race, currentNpc.stats.alignment]
                          .filter((el) => el && el.length > 0)
                          .map((el, i) => (i > 0 ? el.toLowerCase() : el))
                          .join(", ")}
                      </Typography>
                    </Box>
                  </Box>
                  {!!session && session?.userId === currentNpc.createdBy && (
                    <CreatureMenu creature={currentNpc} type="npc" downloadPdf={downloadPdf} />
                  )}
                </Box>
              </>
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
              classes,
              character: currentNpc,
              stats: currentNpc["stats"]["abilityScores"],
              proficiencyBonus: currentNpc["stats"]["proficiencyBonus"],
              proficiencies: [
                {
                  key: "hitPoints",
                  title: "Puntos de vida",
                  content: (
                    <HitPoints modifyHitPoints={modifyHitPoints} hitPoints={currentNpc.stats.hitPoints}>
                      {`${currentNpc["stats"]["hitPoints"]["current"]}${
                        currentNpc.stats.hitPoints.temp ? ` ${getOperatorString(currentNpc.stats.hitPoints.temp)}` : ""
                      } / ${currentNpc["stats"]["hitPoints"]["max"]} (${currentNpc["stats"]["hitDie"]["num"]}d${
                        currentNpc["stats"]["hitDie"]["size"]
                      } ${getOperatorString(
                        parseInt(
                          getModifier(currentNpc["stats"]["abilityScores"]["constitution"]) *
                            currentNpc["stats"]["hitDie"]["num"]
                        )
                      )})`}
                    </HitPoints>
                  ),
                },
                {
                  key: "armorClass",
                  title: "Clase de armadura",
                  content: `${currentNpc["stats"]["armorClass"]} (${
                    ArrayUtil.isNotEmpty(currentNpc.stats.equipment?.armor)
                      ? currentNpc.stats.equipment?.armor
                          .filter((armor) => armor.equipped)
                          .map((armor) => items.find((item) => item.id === armor.id)?.name?.toLowerCase())
                          .join(", ")
                      : "sin armadura"
                  })`,
                },
                { key: "speed", title: "Velocidad", content: getSpeedString(currentNpc.stats.speed) },
                {
                  key: "savingThrows",
                  title: "Tiradas de salvación con competencia",
                  content: getSavingThrowString(currentNpc),
                },
                {
                  key: "skills",
                  title: "Habilidades con competencia",
                  content: getAbilitiesString(currentNpc),
                },
                {
                  key: "senses",
                  title: "Sentidos",
                  content: `Percepción pasiva ${getPassivePerception(
                    currentNpc
                  )}, investigación pasiva ${getPassiveInvestigation(
                    currentNpc
                  )}, bono de Iniciativa ${getOperatorString(getInitiativeBonus(currentNpc))}`,
                },
                {
                  title: "Vulnerabilidades al daño",
                  content: currentNpc["stats"]["damageVulnerabilities"].join(", "),
                },
                {
                  key: "damageResistances",
                  title: "Resistencias al daño",
                  content: currentNpc["stats"]["damageResistances"].join(", "),
                },
                {
                  key: "damageImmunities",
                  title: "Inmunidades al daño",
                  content: currentNpc["stats"]["damageImmunities"].join(", "),
                },
                {
                  key: "conditionImmunities",
                  title: "Inmunidades a la condición",
                  content: currentNpc["stats"]["conditionImmunities"].join(", "),
                },
                {
                  key: "challengeRating",
                  title: "Valor de desafío",
                  content: `${currentNpc["stats"]["challengeRating"]} (${getExperienceByCr(
                    currentNpc["stats"]["challengeRating"]
                  )} puntos de experiencia)`,
                },
              ],
              abilities: [
                { title: "Ataques", content: currentNpc.stats.attacks ? getAttackStrings(currentNpc) : [] },
                { title: "Acciones", content: currentNpc["stats"]["actions"] },
                { title: "Reacciones", content: currentNpc["stats"]["reactions"] },
                { title: "Habilidades", content: currentNpc["stats"]["additionalAbilities"] },
                {
                  title: "Hechizos",
                  content:
                    currentNpc.stats.spells?.length > 0
                      ? { characterSpells: currentNpc.stats.spells, spellData: spells }
                      : null,
                },
                { title: "Acciones legendarias", content: currentNpc["stats"]["legendaryActions"] },
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

  const token = await getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true,
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const npc = await Api.fetchInternal("/npcs/" + query.id, {
    headers,
  }).catch((_) => null);

  if (!npc) return { notFound: true };

  let spells = null;
  let items = [];

  if (!!npc?.stats?.spells && npc.stats.spells.length > 0) {
    const spellIds = [];

    npc.stats.spells.forEach((spellcasting) => {
      Object.values(spellcasting.spells || {})?.forEach((spellLevel) => {
        spellIds.push(...spellLevel);
      });
    });

    spells = await Api.fetchInternal(`/spells?id=${JSON.stringify(spellIds.map((spell) => spell.spellId))}`, {
      headers,
    }).catch((_) => null);
  }

  if (!!npc?.stats?.equipment) {
    const objects = [];

    for (const key in npc.stats.equipment || {}) {
      const element = npc.stats.equipment[key];

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

  let classes = await Api.fetchInternal("/classes/", {
    headers,
  }).catch(() => null);

  if (!!classes) {
    classes = classes.map((charClass) => {
      const parsed = {
        className: charClass.name,
        classId: charClass._id,
      };

      return parsed;
    });
  }

  let tier = null;

  if (!!npc?.flavor.group) {
    tier = await Api.fetchInternal(`/tier-by-creature?type=npc&id=${npc.flavor.group}`, {
      headers,
    })
      .then((res) => res.map((el) => el._id))
      .catch(() => null);
  }

  return {
    props: {
      npc,
      spells,
      items,
      classes,
      tier,
    },
  };
}
