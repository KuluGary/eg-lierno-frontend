import { Tooltip as MuiTooltip } from "@mui/material";
import { withStyles } from "@mui/styles";

const Tooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: theme.typography.pxToRem(14),
  },
}))(MuiTooltip);

export { Tooltip }
