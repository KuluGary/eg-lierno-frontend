import { Box, Divider, Typography } from "@mui/material";
import { Container, Layout, Metadata } from "components";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export default function Post({ data, content }) {
  const { title, description, image, author, date } = data;
  return (
    <Layout>
      <Metadata title={`${title} | Lierno App`} description={description} image={image} />
      <Container sx={{ width: "60vw", margin: "0 auto", padding: 3 }}>
        <Typography variant="h1">{title}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginBlock: ".5rem 1.25rem" }}>
          <Typography variant="subtitle1">{author}</Typography>
          <Typography variant="body1" sx={{ marginInline: "1rem" }}>
            {" • "}
          </Typography>
          <Typography variant="subtitle2">{date}</Typography>
        </Box>
        <Box
          component="img"
          src={image}
          sx={{ maxWidth: "60%", display: "block", margin: "0 auto", borderRadius: 1 }}
        />
        <Divider sx={{ marginBlock: "3rem" }} />
        <ReactMarkdown>{content}</ReactMarkdown>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const file = fs.readFileSync(`content/${query.id}.md`, "utf-8");
  const { data, content } = matter(file);

  return {
    props: {
      data,
      content,
    },
  };
}
