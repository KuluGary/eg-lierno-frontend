import { TableRow as MuiTableRow, TableCell, Typography, IconButton } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Tooltip, Avatar, Link, HTMLContainer } from "..";
import { useSession } from "next-auth/client";

function TableRow({ data, onEdit = () => {}, onDelete, src }) {
  const [session] = useSession();
  const theme = useTheme();
  const editable = data.owner === session?.userId || data.owner === "*";
  const { _id, description, avatar, name, subtitle } = data;
  const parsedSrc = !!src ? src?.replace("{ID}", _id) : "#";

  return (
    <MuiTableRow hover key={_id}>
      <TableCell sx={{ p: "1.5em", borderBottom: "1px solid " + theme.palette.divider }}>
        <Box component="div" sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
            {!!avatar && <Avatar src={avatar} size={56} />}
            <Box component="div" sx={{ pl: !!avatar && "1em" }}>
              <Link href={parsedSrc}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {name}
                </Typography>
              </Link>
              {!!subtitle && (
                <Typography variant="subtitle2" sx={{ opacity: 0.75, fontWeight: 400 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
          <Box component="div" sx={{ display: "flex" }}>
            {editable && !!onEdit && (
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
            {editable && !!onDelete && (
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
          <HTMLContainer content={description} numberOfLines={2} />
        </Box>
      </TableCell>
    </MuiTableRow>
  );
}

export { TableRow };
