import { IconButton, Box, useTheme } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import style from "./DeleteButton.style";

export function DeleteButton({ onClick }) {
  const theme = useTheme();

  return (
    <Box sx={style.container}>
      <IconButton color="error" onClick={onClick} sx={style.iconButton}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
