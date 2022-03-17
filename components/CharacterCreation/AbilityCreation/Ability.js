import { Grid, TextField, Box } from "@mui/material";
import { HTMLEditor } from "components";
import { FullScreenModal } from "components/Modal";
import { useEffect, useState } from "react";
import { ModalFooter, ModalHeader } from ".";

export function Ability({ open, onClose, section, selectedIndex, creature, onSave }) {
  const [content, setContent] = useState({ name: "", description: "" });

  useEffect(() => {
    if (!!section && selectedIndex !== null) {
      const selectedElement = creature.stats[section][selectedIndex];

      if (!!selectedElement) {
        setContent(selectedElement);
      }
    }

    return () => setContent({ name: "", description: "" });
  }, [section, selectedIndex]);

  return (
    <FullScreenModal
      open={open}
      onClose={onClose}
      containerStyles={{ p: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      <Grid container spacing={3}>
        <ModalHeader section={section} onClose={onClose} />
        <Grid item laptop={12}>
          <Box sx={{ paddingInline: "2em" }}>
            <TextField
              fullWidth
              color="secondary"
              placeholder="Nombre de la habilidad"
              value={content.name}
              onChange={() => setContent({ ...content, name: event.target.value })}
            />
          </Box>
        </Grid>
        <Grid item laptop={12}>
          <Box sx={{ paddingInline: "2em" }}>
            <HTMLEditor
              fullWidth
              multiline
              color="secondary"
              placeholder="Descripción de la habilidad"
              value={content.description}
              onChange={(description) => setContent({ ...content, description })}
            />
          </Box>
        </Grid>
      </Grid>
      <ModalFooter onClose={onClose} onSave={() => onSave(content, section, selectedIndex)} />
    </FullScreenModal>
  );
}
