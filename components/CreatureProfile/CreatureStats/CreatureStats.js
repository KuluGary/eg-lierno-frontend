import { getSpellcastingName, getSpellStrings, getStatBonus } from "@lierno/dnd-helpers";
import { Box, Divider, Tab, Table, Tabs, Typography } from "@mui/material";
import { ExpandedTableRow } from "components/Table";
import { useState } from "react";
import { Container, HTMLContainer } from "../..";
import Ability from "./components/Ability/Ability";
import Proficiency from "./components/Proficiency/Proficiency";
import StatComponent from "./components/Stat/Stat";
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
              .map((proficiency, index) => (
                <Proficiency key={index} {...proficiency} />
              ))}
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
            .map((ability, index) => (
              <Ability show={tab === index} key={index} index={index} {...ability} {...data} />
            ))}
        </Box>
      </Container>
    </Box>
  );
}
