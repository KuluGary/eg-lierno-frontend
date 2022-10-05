import { Box, Typography } from "@mui/material";
import { Container, HTMLContainer, Layout, Metadata } from "components";
import Image from "components/Image/Image";
import ItemSubtitle from "components/Subtitle/ItemSubtitle/ItemSubtitle";
import Api from "services/api";
export default function Item({ item }) {
  const image = item?.image?.large ?? item?.image?.small;

  return (
    <Layout>
      <Metadata title={`${item.name} | Lierno App`} />
      <Container sx={{ width: "60vw", m: "0 auto" }}>
        {image && <Image src={item?.image?.small ?? item?.image?.large} sx={{ float: "right" }} />}
        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          {item.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, fontStyle: "italic" }}>
          <ItemSubtitle item={item} />
        </Typography>
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
        <Box component="div">
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
