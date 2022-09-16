import { Box, Dialog, DialogContent } from "@mui/material";
import { Container } from "components/Container/Container";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import style from "./FileUploaderModal.style";

export function FileUploaderModal({ open, onClose, onSave }) {
  const onDrop = useCallback((acceptedFiles) => {
    onSave(acceptedFiles);
  });
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "application/json", maxFiles: 1 });

  return (
    <Dialog open={open} onClose={onClose} sx={{ p: 4 }} fullWidth maxWidth={"tablet"}>
      <DialogContent>
        <Box component="div" {...getRootProps()} sx={{ p: 4 }}>
          <Container sx={style.container}>
            <Box component="input" {...getInputProps()} />
            <Box component="p" sx={{ cursor: "pointer" }}>
              Arrastra tu archivo o haz click aquí
            </Box>
          </Container>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
