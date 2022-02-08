import { FormControl, Grid, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { HTMLEditor } from "components";
import { StringUtil } from "helpers/string-util";

export function Race({ creature, setCreature }) {
  const sizes = [
    StringUtil.generiza("Diminuto", "Diminuta", "Diminute", creature.flavor.traits.pronoun),
    StringUtil.generiza("Pequeño", "Pequeña", "Pequeñe", creature.flavor.traits.pronoun),
    StringUtil.generiza("Mediano", "Mediana", "Mediane", creature.flavor.traits.pronoun),
    "Grande",
    "Enorme",
    StringUtil.generiza("Gigantesco", "Gigantesca", "Gigantesque", creature.flavor.traits.pronoun),
  ];

  return (
    <Grid container spacing={3}>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Detalles de la raza de personaje
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "1em" }}>
          Selecciona los datos referentes a la raza de tu personaje.
        </Typography>
      </Grid>
      <Grid item laptop={8}>
        <TextField
          color="secondary"
          fullWidth
          placeholder="Nombre de la raza"
          value={creature?.stats.race.name}
          onChange={(e) => setCreature("stats.race.name", e.target.value)}
        />
      </Grid>
      <Grid item laptop={4}>
        <FormControl fullWidth>
          <Select
            color="secondary"
            labelId="size-select-label"
            id="size-select"
            placeholder="Tamaño"
            value={creature.stats.race.size || sizes[2]}            
          >
            {sizes.map((size, index) => (
              <MenuItem key={index} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item laptop={12}>
        <HTMLEditor
          color="secondary"
          fullWidth
          multiline
          placeholder="Descripción de la raza"
          value={creature?.stats.race?.description ?? ""}
          onChange={(content) => {setCreature("stats.race.description", content)}}
        />
      </Grid>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Detalles de la subraza de personaje
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "1em" }}>
          Selecciona los datos referentes a la subraza de tu personaje.
        </Typography>
      </Grid>
      <Grid item laptop={12}>
        <TextField
          color="secondary"
          fullWidth
          placeholder="Nombre de la subraza"
          value={creature?.stats.race?.subrace?.name}
          onChange={(e) => setCreature("stats.race.subrace.name", e.target.value)}
        />
      </Grid>
      <Grid item laptop={12}>
        <HTMLEditor
          color="secondary"
          fullWidth
          multiline
          placeholder="Descripción de la subraza"
          value={creature?.stats.race?.subrace?.description ?? ""}
          onChange={(content) => {setCreature("stats.race.subrace.description", content)}}
        />
      </Grid>
    </Grid>
  );
}
