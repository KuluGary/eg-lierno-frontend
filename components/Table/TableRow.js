import { TableRow as MuiTableRow, TableCell, Typography, IconButton } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
import { Link, Tooltip, Avatar } from "..";

function TableRow({ data, onView = () => {}, onEdit = () => {}, onDelete = () => {} }) {
  const theme = useTheme();
  const { _id, description, avatar, name, subtitle } = data;

  return (
    <MuiTableRow hover key={_id}>
      <TableCell sx={{ p: "1.5em", borderBottom: "1px solid " + theme.palette.divider }}>
        <Box component="div" sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
            <Avatar src={avatar} size={56} />
            <Box component="div" sx={{ pl: "1em" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {name}
              </Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.75, fontWeight: 400 }}>
                {subtitle}
              </Typography>
            </Box>
          </Box>
          <Box component="div" sx={{ display: "flex" }}>
            {!!onView && (
              <Tooltip title={"Ver"}>
                <Box component="div" sx={{ margin: "0 .25em" }}>
                  <IconButton
                    color="primary"
                    onClick={onView}
                    sx={{
                      border: `1px solid ${theme.palette.primary.main}55;`,
                      borderRadius: "8px",
                      padding: ".25em",
                      transition: theme.transitions.create(["border"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                      }),
                      "&:hover": {
                        border: `1px solid ${theme.palette.primary.main};`,
                      },
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Tooltip>
            )}
            {!!onEdit && (
              <Tooltip title={"Editar"}>
                <Box component="div" sx={{ margin: "0 .25em" }}>
                  <IconButton
                    color="secondary"
                    onClick={onEdit}
                    sx={{
                      border: `1px solid ${theme.palette.secondary.main}55;`,
                      borderRadius: "8px",
                      padding: ".25em",
                      transition: theme.transitions.create(["border"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                      }),
                      "&:hover": {
                        border: `1px solid ${theme.palette.secondary.main};`,
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Tooltip>
            )}
            {!!onDelete && (
              <Tooltip title={"Eliminar"}>
                <Box component="div" sx={{ margin: "0 .25em" }}>
                  <IconButton
                    color="error"
                    onClick={onDelete}
                    sx={{
                      border: `1px solid ${theme.palette.error.main}55;`,
                      borderRadius: "8px",
                      padding: ".25em",
                      transition: theme.transitions.create(["border"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                      }),
                      "&:hover": {
                        border: `1px solid ${theme.palette.error.main};`,
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Box component="div" sx={{ mt: "1em" }}>
          <Box component="div" dangerouslySetInnerHTML={{ __html: description }} />
        </Box>
      </TableCell>
    </MuiTableRow>
  );
}

export { TableRow };
