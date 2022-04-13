import { Box, Divider, Tab, Table, Tabs, Typography } from "@mui/material";
import {
  Brain,
  CrackedShield,
  DeathSkull,
  Ear,
  HeartBeat,
  MightyForce,
  MuscleUp,
  Resistance,
  Shield,
  Sprint,
} from "components/icons";
import { ExpandedTableRow } from "components/Table";
import { CreatureCalculations } from "helpers/creature-calculations";
import { StringUtil } from "helpers/string-util";
import { useState } from "react";
import { Container, HTMLContainer } from "..";
import StatComponent from "./StatComponent";

const listIcons = {
  // hitPoints: HeartBeat,
  // armorClass: Shield,
  // speed: Sprint,
  // savingThrows: MightyForce,
  // skills: Brain,
  // senses: Ear,
  // challengeRating: DeathSkull,
  // damageVulnerabilities: CrackedShield,
  // damageResistances: Resistance,
  // damageImmunities: Resistance,
  // conditionImmunities: MuscleUp,
};

export function CreatureStats({ Header, containerStyle, data }) {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <Container noPadding header={!!Header && <Header />} sx={{ ...(!!containerStyle && containerStyle) }}>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "75%",
          margin: "0 auto",
          flexWrap: "wrap",
          p: 3,
        }}
      >
        {Object.keys(data.stats)?.map((key) => {
          const bonus =
            CreatureCalculations.getStatBonus("stats.abilityScores." + key, data.character) ?? data.stats[key];

          return <StatComponent stat={bonus} label={key} key={key} />;
        })}
      </Box>
      <Divider />
      <Box component="div" sx={{ paddingInline: 3 }}>
        <Box component="ul" sx={{ p: 0, listStyleType: "none" }}>
          {data.proficiencies
            ?.filter(({ title, content }) => !!title && !!content)
            .map(({ key, title, content }, index) => {
              const Icon = listIcons[key];

              return (
                <Box key={index} component="li" sx={{ display: "flex", alignItems: "center" }}>
                  {!!Icon && <Icon size={20} color="#fff" sx={{ marginRight: 15 }} />}
                  <Box sx={{ flexGrow: 1, width: "100%" }}>
                    <Typography
                      variant="body1"
                      sx={{ mr: 1, float: "left", fontWeight: "bold", width: "fit-content", whiteSpace: "nowrap" }}
                    >
                      {`${title}. `}
                    </Typography>
                    <Typography variant="body1">{content}</Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
      <Divider />
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="Pestañas de Habilidades"
        textColor="secondary"
        indicatorColor="secondary"
      >
        {data.abilities
          ?.filter(({ content }) => content?.length > 0 || Object.keys(content ?? {})?.length > 0)
          .map(({ title }, index) => (
            <Tab key={index} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} label={title} />
          ))}
      </Tabs>
      <Divider />
      <Box component="div">
        {data.abilities
          ?.filter(({ content }) => content?.length > 0 || Object.keys(content ?? {})?.length > 0)
          .map(({ title, content }, index) => {
            if (title === "Ataques") {
              return (
                <Box
                  key={index}
                  component="div"
                  role="tabpanel"
                  id={`tabpanel-${index}`}
                  aria-labelledby={`tab-${index}`}
                >
                  <Table size="small">
                    {tab === index &&
                      content.map((attack, index) => (
                        <ExpandedTableRow
                          index={index}
                          title={attack.name}
                          content={
                            <HTMLContainer
                              content={CreatureCalculations.getAttackStrings(
                                attack,
                                data.proficiencyBonus,
                                data.character
                              )}
                            />
                          }
                        />
                      ))}
                  </Table>
                </Box>
              );
            }

            if (title === "Hechizos") {
              const { characterSpells, spellData } = content;

              return (
                <Box
                  key={index}
                  component="div"
                  role="tabpanel"
                  id={`tabpanel-${index}`}
                  aria-labelledby={`tab-${index}`}
                >
                  <Table size="small">
                    {tab === index &&
                      characterSpells.map((spells, index) => (
                        <ExpandedTableRow
                          index={index}
                          title={StringUtil.getSpellcastingName(spells.caster, data.classes)}
                          content={
                            <HTMLContainer
                              content={CreatureCalculations.getSpellStrings(
                                spells,
                                spellData,
                                data.stats,
                                data.name,
                                data.classes,
                                data.proficiencyBonus
                              )}
                            />
                          }
                        />
                      ))}
                  </Table>
                </Box>
              );
            }

            return (
              <Table size="small">
                {tab === index &&
                  content
                    ?.filter(({ name, description }) => !!name || !!description)
                    .map(({ name, description }, index) => (
                      <ExpandedTableRow
                        index={index}
                        title={name}
                        content={<HTMLContainer content={StringUtil.replaceMarkDownWithHtml(description)} />}
                      />
                    ))}
              </Table>
            );
          })}
      </Box>
    </Container>
  );
}
