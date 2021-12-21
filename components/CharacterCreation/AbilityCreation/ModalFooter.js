import { Button, Box } from "@mui/material";

export function ModalFooter({ onClose, onSave = () => {}, enabled = true }) {
  const saveAndClose = () => {
    onSave();
    onClose();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", m: "1em" }}>
      <Button sx={{ marginInline: ".5em" }} onClick={onClose}>
        Cancelar
      </Button>
      <Button disabled={!enabled} sx={{ marginInline: ".5em" }} onClick={saveAndClose} variant="outlined" color="secondary">
        Guardar
      </Button>
    </Box>
  );
}
