import { Typography, Box, Tabs, Tab, Divider } from "@mui/material";
import { Container, HTMLContainer } from "../..";
import Router from "next/router";
import Image from "../../Image/Image";
import style from "./CreatureFlavor.style";

export function CreatureFlavor({ Header, data, containerStyle }) {
  const { tier, image, sections } = data;

  return (
    <Container header={!!Header && <Header />} sx={{ ...(!!containerStyle && containerStyle) }} noPadding>
      {tier?.length > 1 && (
        <Box sx={style.tierTabContainer}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={data.tier.indexOf(data.id)}
            aria-label="tier tabs"
          >
            {tier.map((t, i) => (
              <Tab
                key={`tier-tab-${i}`}
                label={`${data.type === "character" ? "Nivel" : "Tier"} ${i + 1}`}
                id={`tier-tab-${i}`}
                aria-controls={`$tier-tabpalen-${i}`}
                onClick={() => {
                  data.tier.indexOf(data.id) !== i && Router.push(`/${data.type}s/${t}`);
                }}
              />
            ))}
          </Tabs>
          <Divider />
        </Box>
      )}
      <Box id="creature-flavor" component="div" sx={style.flavorContainer}>
        {image && <Image src={data.image} sx={style.portrait} modal />}
        {sections?.map(({ title, content }) => {
          if (!content) return <></>;

          return (
            <>
              <Typography variant="h6" component="h1">
                {title}
              </Typography>
              <HTMLContainer content={content} />
            </>
          );
        })}
      </Box>
    </Container>
  );
}
