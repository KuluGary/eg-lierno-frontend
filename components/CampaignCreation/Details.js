import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { HTMLEditor } from "components";
import Api from "services/api";
import { useEffect, useState } from "react";
// import ChipInput from "material-ui-chip-input";

export function Details({ campaign, setCampaign }) {
  return (
    <Grid container spacing={3}>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Detalles básicos de la campaña
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "1em" }}>
          Por favor, introduce los detalles básicos referentes a tu campaña.
        </Typography>
      </Grid>
      <Grid item laptop={6}>
        <TextField
          color="secondary"
          fullWidth
          placeholder="Nombre de campaña"
          value={campaign?.name}
          onChange={(e) => setCampaign("name", e.target.value)}
        />
      </Grid>
      <Grid item laptop={3}>
        <FormControl fullWidth>
          <Select
            color="secondary"
            labelId="game-select-label"
            id="game-select"
            value={campaign?.flavor?.game ?? "D&D 5e"}
            onChange={(e) => setCampaign("flavor.game", e.target.value)}
          >
            {["D&D 5e"].map((game, index) => (
              <MenuItem key={index} value={game}>
                {game}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item laptop={3}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              inputProps={{ "aria-label": "¿Con competencia?" }}
              checked={campaign?.completed ?? false}
              onChange={() => setCampaign("completed", !campaign?.completed)}
            />
          }
          label="¿Partida finalizada?"
        />
      </Grid>
      <Grid item laptop={12}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          multiple
          options={[]}
          value={campaign?.players}
          renderInput={(params) => <TextField {...params} label={"Añadir jugadores..."} />}
          onChange={(e, newValue) => setCampaign("players", newValue)}
        />
      </Grid>
      <Grid item laptop={12}>
        <HTMLEditor
          multiline
          fullWidth
          color="secondary"
          label="Sinopsis de la campaña"
          value={campaign.flavor?.synopsis ?? ""}
          onChange={(content) => setCampaign("flavor.synopsis", content)}
        />
      </Grid>
    </Grid>
  );
}
