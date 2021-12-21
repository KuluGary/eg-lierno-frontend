import { useEffect, useState } from "react";
import Api from "helpers/api";
import { CircularProgress, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Step3({ upImg, cropImg, setImage, setDone }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (upImg && cropImg) {
      setLoading(true);
      const headers = {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      const formData = new FormData();

      formData.append("original", upImg);
      formData.append("crop", cropImg);

      const options = {
        method: "POST",
        headers,
        body: formData,
      };

      Api.fetchInternal("/image", options)
        .then(({ images }) => {
          const imgObj = {};

          for (const image of images) {
            imgObj[image.type] = image.link;
          }

          setImage(imgObj);
          setLoading(false);
          setDone(true);
        })
        .catch((error) => console.error(error));
    }
  }, [upImg, cropImg]);

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" />
      </div>
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <CheckCircleIcon fontSize="large" />
        <Typography variant="h6">La imagen se ha guardado con éxito.</Typography>
      </Box>
    </Box>
  );
}

export { Step3 };
