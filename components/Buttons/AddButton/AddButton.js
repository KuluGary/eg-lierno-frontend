import { IconButton, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import style from "./AddButton.style";

export function AddButton({ onClick }) {
  return (
    <Box sx={style.container}>
      <IconButton color="secondary" onClick={onClick} sx={style.iconButton}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
