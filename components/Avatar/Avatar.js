import { stringToHsl } from "@lierno/core-helpers";
import { Avatar as MuiAvatar } from "@mui/material";

function Avatar({ src, fallBackText, size = 32 }) {
  return (
    <MuiAvatar src={src} sx={{ bgcolor: stringToHsl(fallBackText), width: size, height: size }}>
      {fallBackText}
    </MuiAvatar>
  );
}

export { Avatar };
