import { getSpellcastingName, getSpellStrings, getStatBonus } from "@lierno/dnd-helpers";
import { Box, Divider, Tab, Table, Tabs, Typography } from "@mui/material";
import { ExpandedTableRow } from "components/Table";
import { useState } from "react";
import { Container, HTMLContainer } from "../..";
import StatComponent from "../StatComponent/StatComponent";
import style from "./CreatureStats.style";

export function CreatureStats({ Header, containerStyle, data }) {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <Box data-testid="creature-stats">
      <Container noPadding header={!!Header && <Header />} sx={{ ...(!!containerStyle && containerStyle) }}>
        <Box data-testid="stats-container" component="div" sx={style.abilityScoresContainer}>
          {Object.keys(data.stats)?.map((key) => {
            const bonusKey = `stats.abilityScores.${key}`;
            const { total, base, bonusList } = getStatBonus(bonusKey, data.character, bonusKey);

            return (
              <StatComponent stat={total} label={key} key={key} bonusKey={bonusKey} base={base} bonusList={bonusList} />
            );
          })}
        </Box>
        <Divider />
        <Box data-testid="stats-proficiencies" component="div" sx={{ paddingInline: 3 }}>
          <Box component="ul" sx={style.proficiencyContainer}>
            {data.proficiencies
              ?.filter(({ title, content }) => !!title && !!content)
              .map(({ key, title, content }, index) => {
                return (
                  <Box key={index} component="li" sx={style.proficiencyElement}>
                    <Box sx={style.proficiencyElementTextContainer}>
                      <Typography
                        variant="body1"
                        data-testid={`${title.toLowerCase().replaceAll(" ", "-")}-title`}
                        sx={style.proficiencyElementTitle}
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
                        characterSpells.map((spells, index) => {
                          return (
                            <ExpandedTableRow
                              index={index}
                              title={getSpellcastingName(spells.caster, data.classes)}
                              content={
                                <HTMLContainer
                                  content={getSpellStrings(spells, spellData, data.character, data.dataClasses)}
                                />
                              }
                            />
                          );
                        })}
                    </Table>
                  </Box>
                );
              }

              return (
                <Table size="small" data-testid={`abilities-container-${index}`}>
                  {tab === index &&
                    content
                      ?.filter(({ name, description }) => !!name || !!description)
                      .map(({ name, description }, index) => (
                        <ExpandedTableRow
                          index={index}
                          title={name}
                          content={<HTMLContainer content={description} />}
                        />
                      ))}
                </Table>
              );
            })}
        </Box>
      </Container>
    </Box>
  );
}
