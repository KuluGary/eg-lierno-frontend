const maxNumberOfLinesStyle = (numberOfLines) => {
  if (!numberOfLines) return {};

  const lineHeight = 16;
  const containerHeight = numberOfLines + lineHeight * 2.5;

  return {
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    lineHeight: `${lineHeight}px`,
    WebkitLineClamp: `${numberOfLines}`,
    WebkitBoxOrient: "vertical",
    visibility: "visible",
    maxHeight: `${containerHeight}px`,
  };
};

const style = {
  container: {
    "& a": {
      color: (theme) => theme.palette.secondary.main,
      "&:hover": { textDecoration: "underline" },
    },
    "& li": { marginBlock: "1em" },
    "& p": { marginBlock: ".75em" },
  },
};

export { style, maxNumberOfLinesStyle };
