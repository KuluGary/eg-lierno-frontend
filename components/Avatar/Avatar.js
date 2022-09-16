import { Avatar as MuiAvatar, Badge } from "@mui/material";
import style from "./Avatar.style";

function Avatar({ src, fallBackText, size = 32, count }) {
  if (count && count > 1) {
    return (
      <Badge color="secondary" badgeContent={`+${count - 1}`} overlap="circular">
        <MuiAvatar src={src} sx={[style.avatar(fallBackText), { width: size, height: size }]}>
          {fallBackText}
        </MuiAvatar>
      </Badge>
    );
  }

  return (
    <MuiAvatar src={src} sx={[style.avatar(fallBackText), { width: size, height: size }]}>
      {fallBackText}
    </MuiAvatar>
  );
}

export { Avatar };
