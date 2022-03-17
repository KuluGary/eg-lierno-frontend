import { CacheProvider } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider as AuthProvider } from "next-auth/client";
import Head from "next/head";
import PropTypes from "prop-types";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ColorModeContext from "../helpers/color-context";
import createEmotionCache from "../helpers/createEmotionCache";
import { darkTheme, lightTheme } from "../helpers/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState(prefersDarkMode ? "dark" : "light");

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const preferredMode = localStorage.getItem("prefers-color-scheme");

      if (!!preferredMode) {
        setMode(localStorage.getItem("prefers-color-scheme"));
      }
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

        if (typeof window !== undefined) {
          localStorage.setItem("prefers-color-scheme", mode === "light" ? "dark" : "light");
        }
      },
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        ...(mode === "light" ? lightTheme : darkTheme),
        palette: {
          mode,
          ...(mode === "light" ? lightTheme.palette : darkTheme.palette),
        },
      }),
    [mode]
  );

  return (
    <AuthProvider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
      <ToastContainer
        closeOnClick
        draggable
        position="top-right"
        autoClose={5000}
        theme={prefersDarkMode ? "dark" : "light"}
      />
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Lierno App</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CacheProvider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
