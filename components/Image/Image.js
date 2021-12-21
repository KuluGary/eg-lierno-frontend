import { Box, useTheme, Zoom } from "@mui/material";
import { useState } from "react";

const styles = (theme) => ({
  modalStyles: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
    backgroundColor: theme.palette.grey[900] + "B3",
    transitionDelay: "500ms",
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyles: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": { opacity: 0.75 },
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
});

export default function Image({ src, sx, modal }) {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const { modalStyles, imageStyles } = styles(theme);

  return (
    <>
      {modal && modalOpen && (
        <Box component="div" onClick={() => setModalOpen(!modalOpen)} sx={{ ...modalStyles }}>
          <Zoom in={modalOpen} style={{ transitionDelay: modalOpen ? "100ms" : "0ms" }}>
            <Box
              src={src}
              component="img"
              sx={{
                maxHeight: "90vh",
                maxWidth: "90vw",
              }}
            />
          </Zoom>
        </Box>
      )}
      <Box
        component="img"
        src={src}
        onClick={() => setModalOpen(!modalOpen)}
        sx={{
          ...imageStyles,
          ...(!!sx && sx),
        }}
      />
    </>
  );
}
