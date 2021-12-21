import { Box, Divider, Typography, useTheme } from "@mui/material";
import { CreatureCalculations } from "helpers/creature-calculations";
import { StringUtil } from "helpers/string-util";

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
        div: {
          transition: theme.transitions.create(["outline"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
        },
        "&:hover > div": {
          outline: `2px solid ${theme.palette.secondary[theme.palette.mode]}`,
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
        <Typography variant="h5" component="p" sx={{ paddingInline: 3, pb: 2, pt: 1 }}>
          {StringUtil.getOperatorString(CreatureCalculations.modifier(stat))}
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          outline: `1px solid ${theme.palette.divider}`,
          paddingBlock: 0.5,
          paddingInline: 1,
          borderRadius: "12px",
          width: "fit-content",
          transform: "translateY(-50%)",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="button" component="div" style={{ textAlign: "center" }}>
          {stat}
        </Typography>
      </Box>
    </Box>
  );
}
