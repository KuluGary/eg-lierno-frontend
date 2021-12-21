import { Box } from "@mui/material";

export function HTMLContainer({ content, component = "div" }) {
  return (
    <Box
      component={component}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
