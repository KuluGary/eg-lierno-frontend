import { Edit as EditIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import style from "./EditButton.style";

export function EditButton({ onClick }) {
  return (
    <Box sx={style.container}>
      <IconButton color="secondary" onClick={onClick} sx={style.iconButton}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
