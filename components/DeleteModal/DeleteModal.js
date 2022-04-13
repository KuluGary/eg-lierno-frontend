import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

export function DeleteModal({ open, onSave, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ p: 4 }}>{`¿Seguro que quieres eliminar este elemento?`}</DialogTitle>
      <DialogContent
        sx={{ p: 4 }}
      >{`Estás a punto de eliminar este elemento permanentemente. Una vez hagas esto, no podrás recuperar sus datos nunca más.`}</DialogContent>
      <DialogActions sx={{ p: 4 }}>
        <Button sx={{ marginInline: 2 }} variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button sx={{ marginInline: 2 }} variant="outlined" color="error" onClick={onSave}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
