import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { Provider as AuthProvider } from "next-auth/client";
import theme from "../helpers/theme";
import createEmotionCache from "../helpers/createEmotionCache";
import { NavBar, SecondaryNav } from "../components";
import { Layout } from "../components/Layout/Layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <AuthProvider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar open={drawerOpen} handleDrawer={() => setDrawerOpen(!drawerOpen)} />
          <SecondaryNav open={drawerOpen} handleDrawer={() => setDrawerOpen(!drawerOpen)} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
