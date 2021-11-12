import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../helpers/theme";
import createEmotionCache from "../helpers/createEmotionCache";
import { NavBar, SecondaryNav } from "../components";
import { Layout } from "../components/Layout/Layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, token } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isAuthenticated] = React.useState(!!token);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar open={drawerOpen} handleDrawer={() => setDrawerOpen(!drawerOpen)} isAuthenticated={isAuthenticated} />
        <SecondaryNav open={drawerOpen} handleDrawer={() => setDrawerOpen(!drawerOpen)} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getStaticProps = async (ctx) => {
  console.log(ctx);
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}
