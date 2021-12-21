import { IconButton, Box, useTheme } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export function DeleteButton({ onClick }) {
  const theme = useTheme();

  return (
    <Box sx={{ margin: ".5em" }}>
      <IconButton
        color="error"
        onClick={onClick}
        sx={{
          border: `1px solid ${theme.palette.error.main}80`,
          borderRadius: "8px",
          padding: ".25em",
          transition: theme.transitions.create(["border"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          "&:hover": {
            border: `1px solid ${theme.palette.error.main}`,
          },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
