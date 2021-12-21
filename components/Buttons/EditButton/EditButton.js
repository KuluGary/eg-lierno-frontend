import { IconButton, Box, useTheme } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

export function EditButton({ onClick }) {
  const theme = useTheme();

  return (
    <Box sx={{ margin: ".5em" }}>
      <IconButton
        color="secondary"
        onClick={onClick}
        sx={{
          border: `1px solid ${theme.palette.secondary.main}80`,
          borderRadius: "8px",
          padding: ".25em",
          transition: theme.transitions.create(["border"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          "&:hover": {
            border: `1px solid ${theme.palette.secondary.main}`,
          },
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
