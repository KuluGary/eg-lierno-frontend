import { Box, Zoom } from "@mui/material";
import { useState } from "react";
import style from "./Image.style";

export default function Image({ src, sx = {}, modal }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modal && modalOpen && (
        <Box component="div" onClick={() => setModalOpen(!modalOpen)} sx={style.modalStyles}>
          <Zoom in={modalOpen} style={{ transitionDelay: modalOpen ? "100ms" : "0ms" }}>
            <Box
              src={src}
              component="img"
              sx={{
                maxHeight: "90vh",
                maxWidth: "90vw",
              }}
            />
          </Zoom>
        </Box>
      )}
      <Box component="img" src={src} onClick={() => setModalOpen(!modalOpen)} sx={[style.imageStyles, sx]} />
    </>
  );
}
