import { Box, Divider, Typography } from "@mui/material";
import { Container, HTMLContainer, Layout, Metadata } from "components";
import SpellSubtitle from "components/Subtitle/SpellSubtitle/SpellSubtitle";
import Api from "services/api";

export default function Spell({ spell }) {
  return (
    <Layout>
      <Metadata title={`${spell.name} | Lierno App`} description={spell.stats.description} />
      <Container sx={{ width: "60vw", m: "0 auto" }} noPadding>
        <Box sx={{ m: 2 }}>
          <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
            {spell.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, fontStyle: "italic" }}>
            <SpellSubtitle spell={spell} />
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Box component="ul">
            {!!spell.stats.castingTime && (
              <Box component="li">
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  {"Tiempo de lanzamiento: "}
                </Box>
                <Box component="span">{spell.stats.castingTime}</Box>
              </Box>
            )}
            {!!spell.stats.range && (
              <Box component="li">
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  {"Alcance: "}
                </Box>
                <Box component="span">{spell.stats.range}</Box>
              </Box>
            )}
            {!!spell.stats.components.type && (
              <Box component="li">
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  {"Alcance: "}
                </Box>
                <Box component="span">{spell.stats.components.type}</Box>
                {spell.stats.components.description && (
                  <Box component="span">{` (${spell.stats.components.description})`}</Box>
                )}
              </Box>
            )}
            {!!spell.stats.duration && (
              <Box component="li">
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  {"Duración: "}
                </Box>
                <Box component="span">{spell.stats.duration}</Box>
              </Box>
            )}
          </Box>
          <Box component="div">
            <HTMLContainer content={spell.stats.description} />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const spell = await Api.fetchInternal("/spells/" + query.id).catch(() => null);

  return {
    props: {
      spell,
    },
  };
}
