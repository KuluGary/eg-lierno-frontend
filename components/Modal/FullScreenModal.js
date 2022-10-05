import { Modal, Box } from "@mui/material";
import style from "./FullScreenModal.style";

export function FullScreenModal({ children, containerStyles = {}, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={[style.modalContent, containerStyles]}>{children}</Box>
    </Modal>
  );
}
