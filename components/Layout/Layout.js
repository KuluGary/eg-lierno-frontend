import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NavBar, SecondaryNav } from "../";
import { useWidth } from "hooks/useWidth";

export function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const toggleDrawer = () => setOpen(!open);
  const width = useWidth();

  return (
    <>
      <NavBar open={open} toggleDrawer={toggleDrawer} />

      <Box sx={{ display: "flex", alignItems: "stretch", height: "calc(100vh - 60px)" }}>
        {/* Side navigation bar */}
        <SecondaryNav open={open} />

        {/* Content body */}
        <Box
          component="main"
          id="#main-content"
          sx={{
            backgroundColor: theme.palette.background.body,
            flexGrow: 1,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            marginBottom: width.down("tablet") ? "80px" : 0,
          }}
        >
          <Box
            component="div"
            sx={{
              backgroundColor: theme.palette.background.container,
              height: "100%",
              width: "97%",
              borderRadius: "12px 12px 0px 0px",
              p: "1em",
              overflow: "auto",
              ...theme.mixins.noScrollbar /* Firefox */,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
