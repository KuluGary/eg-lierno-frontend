import { Box, Divider, Typography } from "@mui/material";
import { Container, HTMLContainer, Layout, Metadata } from "components";
import references from "helpers/json/references.json";

export default function Reference({ reference }) {
  return (
    <Layout>
      <Metadata title={`${reference.title} | Lierno App`} description={reference.description} />
      <Container sx={{ width: "60vw", m: "0 auto" }} noPadding>
        <Box sx={{ m: 2 }}>
          <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
            {reference.title}
          </Typography>
          <Typography variant="subtitle1">{reference.subtitle}</Typography>
        </Box>
        <Divider />
        <Box sx={{ m: 2 }}>
          <Box component="div">
            <HTMLContainer content={reference.description} />
          </Box>
          <Box component="ul">
            {reference.bullets?.map((bullet, index) => (
              <Box component="li" key={index}>
                {/* {bullet} */}
                <HTMLContainer content={bullet} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  let reference = null;

  Object.values(references).forEach((section) => {
    const ref = section.find((ref) => ref.title === query.id);

    if (!!ref) {
      reference = ref;
    }
  });

  return {
    props: {
      reference,
    },
  };
}
