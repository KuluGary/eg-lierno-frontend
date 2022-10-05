import { Box } from "@mui/material";
import { style, maxNumberOfLinesStyle } from "./HTMLContainer.style";

export function HTMLContainer({ content, component = "div", numberOfLines, sx = {} }) {
  return (
    <Box
      sx={[style.container, maxNumberOfLinesStyle(numberOfLines), sx]}
      component={component}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
