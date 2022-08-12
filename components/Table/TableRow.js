import { TableCell, TableRow as MuiTableRow, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { HTMLContainer, Link, Avatar } from "..";

function TableRow({ data, src }) {
  const theme = useTheme();
  const { _id, id, description, avatar, name, subtitle, count } = data;
  const parsedSrc = !!src ? src?.replace("{ID}", id ?? _id) : "#";

  return (
    <MuiTableRow hover key={_id}>
      <TableCell sx={{ p: "1.5em", borderBottom: "1px solid " + theme.palette.divider }}>
        <Box component="div" sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
            {!!avatar && <Avatar src={avatar} size={56} count={count} />}
            <Box component="div" sx={{ pl: "1em" }}>
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
              {description && (
                <Box component="div">
                  <HTMLContainer content={description} numberOfLines={2} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </TableCell>
    </MuiTableRow>
  );
}

export { TableRow };
