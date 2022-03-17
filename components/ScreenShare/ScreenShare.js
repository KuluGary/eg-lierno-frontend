import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

function ScreenShare({ videoProps, setVideoStream = () => {} }) {
  const videoElement = useRef(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      navigator.mediaDevices.getDisplayMedia({ video: true }).then(addVideoStream);
    }

    return () => {
      if (videoElement.current) {
        videoElement.current.removeEventListener("loadedmetadata");
      }
    };
  }, []);

  const addVideoStream = (stream) => {
    setVideoStream(stream);

    if (videoElement.current) {
      videoElement.current.srcObject = stream;
      videoElement.current.addEventListener("loadedmetadata", () => videoElement.current.play());
    }
  };

  return <Box component="video" {...videoProps} ref={videoElement} />;
}

export { ScreenShare };
