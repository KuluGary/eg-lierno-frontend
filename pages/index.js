import fs from "fs";
import { useRef } from "react";
import Head from "next/head";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Box, Button, Typography } from "@mui/material";
// import { attributes } from "../content/home.md";
import { signIn } from "next-auth/client";
import { Container, Link, NavBar } from "../components";

export default function Home({ posts }) {
  const heroRef = useRef(null);
  // const { title, cats } = posts;

  // console.log(title)

  return (
    <Box component="main" sx={{ paddingBottom: "120px", backgroundColor: (t) => t.palette.background.container }}>
      <Head>
        <title>Lierno App | Inicio</title>
        <link rel="icon" href="/favicon.ico" />
        <script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <NavBar mode="transparent" containerRef={heroRef} />
      <Box
        component="section"
        ref={heroRef}
        elevation={6}
        sx={{
          width: "100%",
          height: "80vh",
          backgroundImage: "url(art/home-bg.jfif)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 0,
        }}
      >
        <Box component="div" sx={{ maxWidth: "85vw", margin: "0 auto", pt: 8 }}>
          <Box component="div" sx={{ maxWidth: { laptop: "40%", mobile: "100%" } }}>
            <Typography variant="h1" color="grey.A100">
              La app para gestionar tus partidas de{" "}
              <Box component="span" color="secondary.main">
                D&D
              </Box>
            </Typography>
            <Typography variant="subtitle1" color="grey.A100" mt={2}>
              Lierno App provee todas las herramientas necesarias para crear y gestionar las partidas y personajes de
              tus juegos de mesa interpretativos.
            </Typography>
            <Link
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <Button sx={{ mt: 2, color: "secondary.light" }}>Entrar a la aplicación</Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {posts.map((post, index) => (
          <Box
            sx={{
              position: "relative",
              width: "calc(70vw / 3)",
              height: "calc(80vw / 3)",
              margin: 1,
              marginTop: -10,
              backgroundImage: `url(${post.image})`,
              backgroundPosition: "center",
              border: "none",
              outline: (theme) => `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "end",
              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
                background: "rgb(0,0,0)",
                background: "linear-gradient(30deg, rgba(0,0,0,.7) 30%, rgba(0,0,0,0) 45%)",
              },
            }}
          >
            {console.log(post)}
            <Box sx={{ zIndex: 1, m: 1 }}>
              <Typography variant="h5" component="h2" sx={{ color: (theme) => theme.palette.text.primary }}>
                {post.title}
              </Typography>
              <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.primary }}>
                {post.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {/* <Box
        component={Paper}
        elevation={6}
        sx={{
          maxWidth: "95vw",
          margin: "-5em auto",
          p: 5,
        }}
      >
        {posts.map((post, index) => (
          <Box key={index}>            
          {console.log(post)}
            <Typography variant="h3">{post.title}</Typography>
            <Box component="img" src={post.image} />
            <ReactMarkdown>
              {post.markdown}
            </ReactMarkdown>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
}

export async function getStaticProps() {
  const filesInContent = fs.readdirSync("content");

  const posts = filesInContent.map((filename) => {
    const file = fs.readFileSync(`content/${filename}`, "utf-8");
    const matterData = matter(file);
    let frontmatter = matterData.data;
    const markdown = matterData.content;

    return {
      ...matterData.data,
      markdown,
      // slug: filename.splice(0, filename.indexOf(".")),
    };
  });

  return {
    props: {
      posts,
    },
  };
}
