import { Box } from "@mui/material";

const maxNumberOfLinesStyle = (numberOfLines) => ({
  wordBreak: "break-word",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  lineHeight: "16px",
  WebkitLineClamp: `${numberOfLines}`,
  WebkitBoxOrient: "vertical",
});

export function HTMLContainer({ content, component = "div", numberOfLines }) {
  return (
    <Box
      sx={{
        ...(!!numberOfLines && maxNumberOfLinesStyle(numberOfLines)),
        "& a": { color: (theme) => theme.palette.secondary.main },
        "& li": { marginBlock: "1em" }
      }}
      component={component}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
