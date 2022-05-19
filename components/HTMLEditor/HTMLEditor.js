import { TextField, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { forwardRef } from "react";

const ReactQuillCustom = forwardRef(function ReactQuillCustom(props, ref) {
  const { onChange, value, label, ...other } = props;

  return <ReactQuill {...other} defaultValue={value} modules={MODULES} formats={FORMATS} ref={ref} theme={"snow"} onChange={onChange} />;
});

export function HTMLEditor({ value, onChange, placeholder = "", inputStyles, ...other }) {
  const theme = useTheme();

  return (
    <TextField
      {...other}
      sx={{
        "& .MuiOutlinedInput-root": {
          padding: 0,
        },
        "& .ql-toolbar, .ql-container": {
          border: 0,
        },
        "& .ql-toolbar": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        ".ql-editor p:first-of-type": {
          marginBlock: 0
        },
        ".ql-editor p:last-of-type": {
          marginBottom: 0
        },
        ".ql-editor p": {
          marginBlock: "1em"
        },
        ".ql-editor ul li": {
          marginBlock: "1em"
        },
        ".ql-editor.ql-blank::before": {
          color: theme.palette.text.disabled,
          fontStyle: "initial"
        },
        "& .ql-container": {
          fontSize: theme.typography.htmlFontSize,
        },
        "& .ql-fill": {
          fill: theme.palette.text.primary,
          "&:hover": {
            fill: theme.palette.secondary.main
          }
        },
        "& .ql-stroke": {
          stroke: theme.palette.text.primary,
          "&:hover": {
            stroke: theme.palette.secondary.main
          }
        },
        "& .ql-picker": {
          color: theme.palette.text.primary,
        },
        "& .ql-picker-options": {
          backgroundColor: theme.palette.background.paper,
        },
        "button:hover": {
          color: "red !important"
        },
        ...(!!inputStyles && inputStyles)
      }}
      multiline
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{ inputComponent: ReactQuillCustom }}
      InputLabelProps={{ shrink: true }}
    />
  );
}

const MODULES = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
