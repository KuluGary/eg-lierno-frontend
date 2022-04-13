import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, IconButton, TableCell, TableRow, Typography } from "@mui/material";

export function ExpandedTableRow({ icon, title, content, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={index} sx={{ "& > *": { borderBottom: "unset" } }}>
        {!!icon && <TableCell sx={{ width: "1rem" }}>{icon}</TableCell>}
        <TableCell>
          <Typography variant="overline">{title}</Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: !open && 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {content}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
