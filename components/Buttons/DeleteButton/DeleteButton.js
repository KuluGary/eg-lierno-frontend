import { Delete as DeleteIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import style from "./DeleteButton.style";

export function DeleteButton({ onClick }) {
  return (
    <Box sx={style.container}>
      <IconButton color="error" onClick={onClick} sx={style.iconButton}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
