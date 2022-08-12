import { Typography, Box, Tabs, Tab, Divider } from "@mui/material";
import { Container, HTMLContainer } from "../..";
import Router from "next/router";
import Image from "../../Image/Image";
import style from "./CreatureFlavor.style";

export function CreatureFlavor({ Header, data, containerStyle }) {
  return (
    <Container header={!!Header && <Header />} sx={{ ...(!!containerStyle && containerStyle) }} noPadding>
      {data?.tier?.length > 1 && (
        <Box sx={style.tierTabContainer}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={data.tier.indexOf(data.id)}
            aria-label="tier tabs"
          >
            {data.tier.map((t, i) => (
              <Tab
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
        {data.image && <Image src={data.image} sx={style.portrait} modal />}
        {data.sections?.map(({ title, content }, index) => {
          if (!content) return <></>;

          return (
            <Box id={`section-${title.toLowerCase()}`} component="section" key={index}>
              <Typography variant="h6" component="h1">
                {title}
              </Typography>
              <Box component="p">
                <HTMLContainer content={content} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
