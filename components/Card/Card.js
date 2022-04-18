import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Box, Card as MuiCard, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Avatar } from "components/Avatar/Avatar";
import { Link } from "components/Link/Link";
import { useSession } from "next-auth/react";

export default function Card({ data, onEdit = () => {}, onDelete = () => {}, src }) {
  const { data: session } = useSession();
  const editable = data.owner === session?.userId || data.owner === "*";
  const { _id, avatar, name, subtitle } = data;
  const parsedSrc = !!src ? src?.replace("{ID}", _id) : "#";

  return (
    <MuiCard sx={{ width: 345, position: "relative" }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image={avatar ?? "https://picsum.photos/140"}
        sx={{ filter: "brightness(35%)" }}
      />
      <CardContent sx={{ position: "absolute", top: 0, display: "flex", gap: "1em", alignItems: "center" }}>
        <Avatar src={avatar} size={56} />
        <Box component="div">
          <Link href={parsedSrc}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {name}
            </Typography>
          </Link>
          <Typography variant="subtitle2" sx={{ opacity: 0.75, fontWeight: 400 }}>
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center", gap: "2em" }}>
        {!!editable && !!onEdit && (
          <IconButton color="secondary" onClick={onEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        {editable && !!onDelete && (
          <Box component="div" sx={{ margin: "0 .25em" }}>
            <IconButton color="error" onClick={onDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </MuiCard>
  );
}
