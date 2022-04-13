import { Box, Divider, Typography, useTheme } from "@mui/material";
import { CreatureCalculations } from "helpers/creature-calculations";
import { StringUtil } from "helpers/string-util";
import { Shield as ShieldIcon } from "components/icons";

export default function StatComponent({ stat, label }) {
  const theme = useTheme();
  const statLabels = {
    strength: "FUE",
    dexterity: "DES",
    constitution: "CON",
    intelligence: "INT",
    wisdom: "SAB",
    charisma: "CAR",
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        margin: "1em .25em",
        div: {
          transition: theme.transitions.create(["outline"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
        },
        g: {
          stroke: theme.palette.divider,
          strokeWidth: 20,
          transition: theme.transitions.create(["stroke"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
        },
        "&:hover > div": {
          outline: `2px solid ${theme.palette.secondary[theme.palette.mode]}`,
        },
        "&:hover g": {
          stroke: theme.palette.secondary[theme.palette.mode],
          strokeWidth: 60,
        },
      }}
    >
      <Box
        component="div"
        sx={{ outline: `1px solid ${theme.palette.divider}`, borderRadius: "12px", width: "fit-content" }}
      >
        <Box component="div" sx={{ paddingInline: 3, paddingBlock: 0.5, display: "flex", justifyContent: "center" }}>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            {statLabels[label]}
          </Typography>
        </Box>
        <Divider />
        <Typography variant="h5" component="p" sx={{ paddingInline: 3, pb: 2, pt: 1, textAlign: "center" }}>
          {StringUtil.getOperatorString(CreatureCalculations.modifier(stat))}
        </Typography>
      </Box>
      <ShieldIcon
        width={35}
        height={40}
        color={theme.palette.background.paper}
        sx={{ position: "absolute", bottom: "-2rem" }}
      />
      <Typography
        variant="button"
        component="span"
        style={{ textAlign: "center", position: "absolute", bottom: "-1rem" }}
      >
        {stat}
      </Typography>
    </Box>
  );
}
