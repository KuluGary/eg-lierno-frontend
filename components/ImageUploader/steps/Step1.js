import { isValidUrl } from "@lierno/core-helpers";
import { Box, TextField, useTheme } from "@mui/material";
import { Container } from "components";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function Step1({ setUpImg, handleNext }) {
  const theme = useTheme();
  const [urlError, setUrlError] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const blob = new Blob([reader.result]);

        setUpImg(blob);
        handleNext();
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const handleLink = async (e) => {
    try {
      setUrlError(false);
      const url = e.target.value;

      if (!!url && isValidUrl(url)) {
        const response = await fetch(url);
        const imageBlob = await response.blob();

        setUpImg(imageBlob);
        handleNext();
      }
    } catch (error) {
      setUrlError(true);
      console.error(error);
    }
  };

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
      <TextField
        error={urlError}
        helperText={urlError ? "URL inválida" : ""}
        fullWidth
        sx={{ marginBlock: "1em" }}
        label={"O añade un enlace"}
        onChange={handleLink}
      />
    </section>
  );
}

export { Step1 };
