import { Divider, Paper, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function Container({ hover = false, header, children, noPadding, sx = {} }) {
  const theme = useTheme();

  return (
    <Paper
      variant={"outlined"}
      sx={{
        ...(!!hover && { "&:hover": { boxShadow: theme.shadows[2] } }),
        overflowY: "scroll",
        ...sx,
        ...theme.mixins.noScrollbar,
      }}
    >
      {!!header && (
        <>
          <Box component="div" sx={{ ...(!noPadding && { p: "1em" }) }}>
            {header}
          </Box>
          <Divider />
        </>
      )}
      <Box component="div" sx={{ ...(!noPadding && { p: "1em" }) }}>
        {children}
      </Box>
    </Paper>
  );
}
