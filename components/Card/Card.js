import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Badge,
  Box,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Avatar } from "components/Avatar/Avatar";
import { Link } from "components/Link/Link";
import { useSession } from "next-auth/react";
import style from "./Card.style";

export default function Card({ data, onEdit = () => {}, onDelete = () => {}, src }) {
  const { data: session } = useSession();
  const editable = data.owner === session?.userId || data.owner === "*";
  const { _id, avatar, name, subtitle, amount } = data;
  const parsedSrc = !!src ? src?.replace("{ID}", _id) : "#";

  return (
    <MuiCard sx={style.cardContainer} variant="outlined">
      <CardMedia component="img" height="140" image={avatar ?? "https://picsum.photos/140"} sx={style.cardMedia} />
      <CardContent sx={style.cardContent}>
        {amount && amount > 1 ? (
          <Badge badgeContent={amount} color="secondary" overlap="circular">
            <Avatar src={avatar} size={56} />
          </Badge>
        ) : (
          <Avatar src={avatar} size={56} />
        )}
        <Box component="div">
          <Link href={parsedSrc}>
            <Typography variant="subtitle1" sx={style.cardTitle}>
              {name}
            </Typography>
          </Link>
          <Typography variant="subtitle2" sx={style.cardSubtitle}>
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={style.cardActions}>
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
