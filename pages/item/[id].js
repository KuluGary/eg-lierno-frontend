import { Box, Typography } from "@mui/material";
import { Container, HTMLContainer, Layout, Metadata } from "components";
import Api from "services/api";

export default function Item({ item }) {
  return (
    <Layout>
      <Metadata title={`${item.name} | Lierno App`} />
      <Container sx={{ width: "60vw", m: "0 auto" }} noPadding>        
        <Box sx={{ m: 2 }}>
          <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
            {item.name}
          </Typography>
        </Box>
        <Box component="ul">
          {item.properties.map((property, index) => (
            <Box component="li" key={index}>
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {`${property.key}: `}
              </Box>
              <Box component="span">{property.value}</Box>
            </Box>
          ))}
        </Box>
        <Box component="div" sx={{ m: 2 }}>
          <HTMLContainer content={item.description} />
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const item = await Api.fetchInternal("/items/" + query.id).catch(() => null);

  return {
    props: {
      item,
    },
  };
}
