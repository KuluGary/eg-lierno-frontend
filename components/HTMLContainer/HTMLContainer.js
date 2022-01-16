import { Box } from "@mui/material";

const maxNumberOfLinesStyle = (numberOfLines) => ({
  wordBreak: "break-word",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  lineHeight: "16px",
  WebkitLineClamp: `${numberOfLines}`,
  WebkitBoxOrient: "vertical",
})

export function HTMLContainer({ content, component = "div", numberOfLines }) {
  return (
    <Box
      style={{
        ...(!!numberOfLines && maxNumberOfLinesStyle(numberOfLines))
      }}
      component={component}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
