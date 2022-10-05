import { KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import style from "./ExpandedTableRow.style";

export function ExpandedTableRow({ icon, title, content, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={index} sx={style.tableRowContainer}>
        {!!icon && <TableCell sx={style.tableCellIcon}>{icon}</TableCell>}
        <TableCell>
          <Typography variant="overline">{title}</Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            <KeyboardArrowUp sx={[style.arrowIcon, style[open ? "arrowIconOpen" : "arrowIconClosed"]]} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={[style.tableRowBody, { borderBottom: !open && 0 }]} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {content}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
