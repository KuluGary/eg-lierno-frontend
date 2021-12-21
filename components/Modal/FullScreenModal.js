import { Modal, Box } from "@mui/material";

export function FullScreenModal({ children, containerStyles, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "65vw",
          minHeight: "70vh",
          maxHeight: "95vh",
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          ...(!!containerStyles && containerStyles),
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
