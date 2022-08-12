import { IconButton, Box, useTheme } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import style from "./EditButton.style";

export function EditButton({ onClick }) {
  const theme = useTheme();

  return (
    <Box sx={style.container}>
      <IconButton color="secondary" onClick={onClick} sx={style.iconButton}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
