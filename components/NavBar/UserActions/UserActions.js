import { getInitials } from "@lierno/core-helpers";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Avatar } from "components/Avatar/Avatar";
import { Link } from "components/Link/Link";
import ColorModeContext from "services/color-context";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import style from "./UserActions.style";

export default function UserActions({ isMainScreen = false }) {
  const { data: session, status: sessionStatus } = useSession();
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  if (sessionStatus === "loading") return <React.Fragment />;

  if (sessionStatus === "unauthenticated")
    return (
      <Link
        href={"/api/auth/signing"}
        sx={style.unAuthLink}
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <Button variant="outlined" color={!isMainScreen ? "primary" : "inherit"}>
          Entrar
        </Button>
      </Link>
    );

  return (
    <>
      {isMainScreen && (
        <Link href="/characters" sx={style.goToAppLink}>
          Ir al Panel
        </Link>
      )}
      {!isMainScreen && (
        <IconButton onClick={colorMode.toggleColorMode}>
          <svg
            style={{
              width: "24px",
              height: "24px",
              fill: theme.palette.grey["500"],
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="472.39"
            height="472.39"
            viewBox="0 0 472.39 472.39"
          >
            <g
              style={{
                transformOrigin: "center center",
                transition: "transform 750ms cubic-bezier(0.11, 0.14, 0.29, 1.32)",
                transform: theme.palette.mode === "light" ? "rotate(0.5turn)" : "",
              }}
            >
              <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
            </g>
            <g
              style={{
                transition: "transform 500ms ease-out",
                transform: theme.palette.mode === "light" ? "translateX(-15%)" : "",
              }}
            >
              <circle cx="236.2" cy="236.2" r="103.78" />
            </g>
          </svg>
        </IconButton>
      )}
      <IconButton onClick={handleMenu} color="inherit">
        <Avatar src={session?.picture} fallBackText={getInitials(session?.name)} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>Mi cuenta</MenuItem>
        <MenuItem onClick={handleLogout}>
          <Link href={`/api/auth/signout`}>Salir</Link>
        </MenuItem>
      </Menu>
    </>
  );
}
