import React, { useState, useCallback } from "react";
import { TextField, Divider, Box, useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Container } from "components";

function Step1({ setUpImg }) {
  const theme = useTheme();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const blob = new Blob([reader.result]);

        setUpImg(blob);
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/jpeg, image/png", maxFiles: 1 });

  return (
    <section className="container">
      <Box component="div" {...getRootProps()}>
        <Container
          sx={{
            backgroundColor: theme.palette.background.paper,
            textAlign: "center",
            "&:hover": { "box-shadow": theme.shadows[1], backgroundColor: theme.palette.action.hover },
          }}
        >
          <Box component="input" {...getInputProps()} />
          <Box component="p" sx={{ cursor: "pointer" }}>
            Arrastra tus imagenes o haz click aquí
          </Box>
        </Container>
      </Box>
    </section>
  );
}

export { Step1 };
