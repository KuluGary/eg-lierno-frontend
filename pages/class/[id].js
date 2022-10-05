import { Box, Typography } from "@mui/material";
import { Container, HTMLContainer, Layout, Metadata } from "components";
import Image from "components/Image/Image";
import Api from "services/api";

export default function Item({ classes }) {
  return (
    <Layout>
      <Metadata title={`${classes.name} | Lierno App`} />
      <Container sx={{ width: "60vw", m: "0 auto" }}>
        {<Image src={classes.image} sx={{ float: "right", maxWidth: "25%", border: "none" }} />}
        <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
          {classes.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, fontStyle: "italic", marginBottom: "10px" }}>
          {classes.game}
        </Typography>
        <Box component="div">
          <HTMLContainer content={classes.data.content} />
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const classes = await Api.fetchInternal("/classes/" + query.id).catch(() => null);

  return {
    props: {
      classes,
    },
  };
}
