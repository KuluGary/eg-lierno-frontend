import { TableCell, TableRow as MuiTableRow, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { HTMLContainer, Link, Avatar } from "..";
import { convert as convertHtmlToString } from "html-to-text";
import { useWidth } from "hooks/useWidth";

function TableRow({ data, src }) {
  const theme = useTheme();
  const width = useWidth();
  const { _id, id, description, avatar, name, subtitle, count } = data;
  const parsedSrc = !!src ? src?.replace("{ID}", id ?? _id) : "#";

  const parseDescription = (description) => {
    const maxWords = width.down("tablet") ? 25 : 75;
    const descriptionArray = convertHtmlToString(description, {
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    }).split(" ");

    if (descriptionArray.length < maxWords) return descriptionArray.join(" ");

    return descriptionArray.slice(0, maxWords).join(" ") + "...";
  };

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
                <Typography variant="subtitle2" sx={{ opacity: 0.75, fontWeight: 500, fontStyle: "italic" }}>
                  {subtitle}
                </Typography>
              )}
              {description && <Box component="div">{parseDescription(description)}</Box>}
            </Box>
          </Box>
        </Box>
      </TableCell>
    </MuiTableRow>
  );
}

export { TableRow };
