import { Avatar as MuiAvatar } from "@mui/material";
import { StringUtil } from "helpers/string-util";

function Avatar({ src, fallBackText, size = 32 }) {
  return (
    <MuiAvatar src={src} sx={{ bgcolor: StringUtil.stringToHsl(fallBackText), width: size, height: size }}>
      {fallBackText}
    </MuiAvatar>
  );
}

export { Avatar };
