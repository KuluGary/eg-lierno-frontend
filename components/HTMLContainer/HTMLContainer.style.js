const maxNumberOfLinesStyle = (numberOfLines) => {
  if (!numberOfLines) return {};

  return {
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    lineHeight: "16px",
    WebkitLineClamp: `${numberOfLines}`,
    WebkitBoxOrient: "vertical",
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
