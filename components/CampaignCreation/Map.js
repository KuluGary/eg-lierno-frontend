import { Grid, TextField, Typography } from "@mui/material";

export function Map({ campaign, setCampaign }) {
  return (
    <Grid container spacing={3}>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Incluye el mapa de tu campaña
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "1em" }}>
          Por favor, introduce la URL al mapa de tu campaña.
        </Typography>
      </Grid>
      <Grid item laptop={12}>
        <TextField
          fullWidth
          color="secondary"
          label="URL de tu mapa"
          value={campaign.map ?? ""}
          onChange={(e) => setCampaign("map", e.target.value)}
        />
      </Grid>
      <Grid item laptop={12}>
          {!!campaign?.map && <iframe style={{ width: "100%", minHeight: "40vh", border: "none" }} src={campaign.map} />}
      </Grid>
    </Grid>
  );
}
