import { Avatar as MuiAvatar } from "@mui/material";
import { blue, amber, brown, orange, red } from "@mui/material/colors";

function Avatar({ src, fallBackText, size=32 }) {
  const colors = [blue[500], amber[500], brown[500], orange[500], red[500]];
  const randColor = colors[Math.floor(Math.random() * colors.length)];
  

  return <MuiAvatar src={src} sx={{bgcolor: randColor, width: size, height: size }}>{fallBackText}</MuiAvatar>;
}

export { Avatar }
