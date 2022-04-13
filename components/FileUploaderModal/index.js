import { useTheme } from "@emotion/react";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Container } from "components/Container/Container";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function FileUploaderModal({ open, onClose, onSave }) {
  const theme = useTheme();
  const onDrop = useCallback((acceptedFiles) => {
    onSave(acceptedFiles);
  });
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "application/json", maxFiles: 1 });

  return (
    <Dialog open={open} onClose={onClose} sx={{ p: 4 }} fullWidth maxWidth={"tablet"}>
      <DialogContent>
        <Box component="div" {...getRootProps()} sx={{ p: 4 }}>
          <Container
            sx={{
              backgroundColor: theme.palette.background.paper,
              textAlign: "center",
              "&:hover": { "box-shadow": theme.shadows[1], backgroundColor: theme.palette.action.hover },
            }}
          >
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
