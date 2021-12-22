import { Avatar as MuiAvatar } from "@mui/material";
import {
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";

function Avatar({ src, fallBackText, size = 32 }) {
  // const colors = [blue[500], amber[500], brown[500], orange[500], red[500]];
  const colors = [
    amber[500],
    blue[500],
    blueGrey[500],
    brown[500],
    common[500],
    cyan[500],
    deepOrange[500],
    deepPurple[500],
    green[500],
    grey[500],
    indigo[500],
    lightBlue[500],
    lightGreen[500],
    lime[500],
    orange[500],
    pink[500],
    purple[500],
    red[500],
    teal[500],
    yellow[500],
  ];
  const randColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <MuiAvatar src={src} sx={{ bgcolor: randColor, width: size, height: size }}>
      {fallBackText}
    </MuiAvatar>
  );
}

export { Avatar };
