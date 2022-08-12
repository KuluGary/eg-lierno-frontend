import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavBar, SecondaryNav } from "../";
import { useWidth } from "hooks/useWidth";
import style from "./Layout.style";

export function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const toggleDrawer = () => setOpen(!open);
  const width = useWidth();

  return (
    <>
      <NavBar open={open} toggleDrawer={toggleDrawer} />

      <Box sx={style.container}>
        {/* Side navigation bar */}
        <SecondaryNav open={open} />

        {/* Content body */}
        <Box component="main" id="#main-content" sx={style.mainContainer}>
          <Box component="div" sx={[style.contentContainer, theme.mixins.noScrollbar]}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
