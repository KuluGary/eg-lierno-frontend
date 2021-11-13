import { Avatar } from "@mui/material";

export default function UserAvatar({ src, fallBackText }) {
  return <Avatar src={src} alt={fallBackText} />;
}
