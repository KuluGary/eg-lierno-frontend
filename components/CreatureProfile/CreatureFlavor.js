import { Typography, Box } from "@mui/material";
import { Container } from "..";
import Image from "../Image/Image";

export function CreatureFlavor({ Header, data, containerStyle }) {
  return (
    <Container header={!!Header && <Header />} sx={{ ...(!!containerStyle && containerStyle) }}>
      <Box component="div" sx={{ p: 1 }}>
        {data.image && <Image src={data.image} sx={{ maxWidth: "100%", maxHeight: "35vh", float: "left", margin: ".5em 1em 0 0" }} modal />}
        {data.sections?.map(({ title, content }, index) => {
          if (!content) return <></>;

          return (
            <Box component="section" key={index}>
              <Typography variant="h6" component="h1">
                {title}
              </Typography>
              <Box component="p">
                <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: content }} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
