import { TextField } from "@mui/material";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import style from "./HTMLEditor.style";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ReactQuillCustom = forwardRef(function ReactQuillCustom(props, ref) {
  const { onChange, value, label, ...other } = props;

  return (
    <ReactQuill
      {...other}
      defaultValue={value}
      modules={MODULES}
      formats={FORMATS}
      ref={ref}
      theme={"snow"}
      onChange={onChange}
    />
  );
});

export function HTMLEditor({ value, onChange, placeholder = "", inputStyles = {}, ...other }) {
  return (
    <TextField
      {...other}
      sx={[style.container, inputStyles]}
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
