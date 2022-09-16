const style = {
  container: {
    "& .MuiOutlinedInput-root": {
      padding: 0,
    },
    "& .ql-toolbar, .ql-container": {
      border: 0,
    },
    "& .ql-toolbar": {
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
    },
    ".ql-editor p:first-of-type": {
      marginBlock: 0,
    },
    ".ql-editor p:last-of-type": {
      marginBottom: 0,
    },
    ".ql-editor p": {
      marginBlock: "1em",
    },
    ".ql-editor ul li": {
      marginBlock: "1em",
    },
    ".ql-editor.ql-blank::before": {
      color: (theme) => theme.palette.text.disabled,
      fontStyle: "initial",
    },
    "& .ql-container": {
      fontSize: (theme) => theme.typography.htmlFontSize,
    },
    "& .ql-fill": {
      fill: (theme) => theme.palette.text.primary,
      "&:hover": {
        fill: (theme) => theme.palette.secondary.main,
      },
    },
    "& .ql-stroke": {
      stroke: (theme) => theme.palette.text.primary,
      "&:hover": {
        stroke: (theme) => theme.palette.secondary.main,
      },
    },
    "& .ql-picker": {
      color: (theme) => theme.palette.text.primary,
    },
    "& .ql-picker-options": {
      backgroundColor: (theme) => theme.palette.background.paper,
    },
  },
};

export default style;
