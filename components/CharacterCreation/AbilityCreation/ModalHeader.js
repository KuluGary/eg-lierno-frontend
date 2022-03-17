import { Grid, Typography, Box, Divider } from "@mui/material";

const headerDictionary = {
    attacks: "Genera un ataque",
    actions: "Genera una acción",
    bonusActions: "Genera una acción adicional",
    reactions: "Genera una reacción",
    additionalAbilities: "Genera una habilidad",
    spells: "Genera lanzamiento de conjuros",
  };

export function ModalHeader({ section }) {
  return (
    <Grid item laptop={12}>
      <Box sx={{ padding: "1em" }}>
        <Typography variant="h6" component="h2" color="background.contrastText">
          {headerDictionary[section]}
        </Typography>
      </Box>
      <Divider />
    </Grid>
  );
}
