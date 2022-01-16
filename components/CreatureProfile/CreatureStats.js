import { useState } from "react";
import { Container, HTMLContainer } from "..";
import { Box, Divider, Typography, Tabs, Tab } from "@mui/material";
import StatComponent from "./StatComponent";
import { StringUtil } from "helpers/string-util";
import { CreatureCalculations } from "helpers/creature-calculations";

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
        {Object.keys(data.stats)?.map((key) => (
          <StatComponent stat={data.stats[key]} label={key} key={key} />
        ))}
      </Box>
      <Divider />
      <Box component="div" sx={{ paddingInline: 3 }}>
        <Box component="ul" sx={{ p: 0, listStyleType: "none" }}>
          {data.proficiencies
            ?.filter(({ title, content }) => !!title && !!content)
            .map(({ title, content }, index) => (
              <Box key={index} component="li" sx={{ marginBlock: 0.5 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", float: "left", mr: 1 }}>
                  {title + "."}
                </Typography>
                <Typography variant="body1">{content}</Typography>
              </Box>
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
      <Box component="div" sx={{ paddingInline: 3 }}>
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
                  <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
                    {tab === index &&
                      content.map((attack, i) => (
                        <Box component="li" sx={{ marginBlock: 2 }} key={i}>
                          <Typography variant="body1" sx={{ fontWeight: "bold", float: "left", mr: 1 }}>
                            {attack.name + "."}
                          </Typography>
                          <HTMLContainer
                            content={CreatureCalculations.getAttackStrings(attack, data.stats, data.proficiencyBonus)}
                          />
                        </Box>
                      ))}
                  </Box>
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
                  <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
                    {tab === index &&
                      characterSpells.map((spells, index) => (
                        <Box component="li" sx={{ marginBlock: 2 }} key={index}>
                          <Typography variant="body1" sx={{ fontWeight: "bold", float: "left", mr: 1 }}>
                            {StringUtil.getSpellcastingName(spells.caster, data.classes)}
                          </Typography>
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
                        </Box>
                      ))}
                  </Box>
                </Box>
              );
            }

            return (
              <Box
                key={index}
                component="div"
                role="tabpanel"
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
              >
                <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
                  {tab === index &&
                    content
                      ?.filter(({ name, description }) => !!name || !!description)
                      .map(({ name, description }, index) => (
                        <Box key={index} component="li" sx={{ marginBlock: 2 }}>
                          <Typography variant="body1" sx={{ fontWeight: "bold", float: "left", mr: 1 }}>
                            {name + "."}
                          </Typography>
                          <HTMLContainer content={StringUtil.replaceMarkDownWithHtml(description)} />
                        </Box>
                      ))}
                </Box>
              </Box>
            );
          })}
      </Box>
    </Container>
  );
}
