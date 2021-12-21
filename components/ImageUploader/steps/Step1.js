import React, { useState, useCallback } from "react";
import { TextField, Divider, Box, useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Container } from "components";

function Step1({ setUpImg }) {
  const theme = useTheme();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = () => {
        const blob = new Blob([reader.result]);

        setUpImg(blob);
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/jpeg, image/png" });

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
          <Box component="p">Arrastra tus imagenes o haz click aquí</Box>
        </Container>
      </Box>
      {/* <Box
        component="div"
        {...getRootProps()}
        sx={{
          backgroundColor: "action.hover",
          borderWidth: "2px",
          borderStyle: "dashed",
          borderColor: "action.disabled",
          color: "action.disabled",
          borderRadius: "12px",
          textAlign: "center",
          p: 4,
          transition: theme.transitions.create(["border"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
          "&:hover": {
            borderColor: "secondary.main",
          },
        }}
      >
        <Box component="input" {...getInputProps()} />
        <Box component="p">Arrastra tus imagenes o haz click aquí</Box>
      </Box> */}
    </section>
  );
}

export { Step1 };
