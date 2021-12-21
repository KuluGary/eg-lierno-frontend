import { InfoOutlined } from "@mui/icons-material";
import { Autocomplete, Chip, Grid, IconButton, TextField, Typography } from "@mui/material";

export function Discord({ campaign, setCampaign }) {
  return (
    <Grid container spacing={3}>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Información del canal de Discord de tu campaña
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "1em" }}>
          Por favor, introduce los detalles del canal de Discord de tu campaña.
        </Typography>
      </Grid>
      <Grid item laptop={12}>
        <TextField
          color="secondary"
          fullWidth
          label="Canal principal de la campaña"
          value={campaign?.discordData?.main}
          onChange={(e) => setCampaign("discordData.main", e.target.value)}
          InputProps={{
            endAdornment: (
              <a
                target="_blank"
                rel="noreferrer"
                href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-"
              >
                <InfoOutlined color="secondary" />
              </a>
            ),
          }}
        />
      </Grid>
      <Grid item laptop={12}>
        <Autocomplete
          multiple
          freeSolo
          id="tags-standard"
          value={campaign.discordData?.privadas ?? []}
          options={[]}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} color="secondary" variant="outlined" placeholder="Añadir canales secundarios..." />
          )}
          onChange={(_, newData) => setCampaign("discordData.secondary", newData)}
        />
      </Grid>
    </Grid>
  );
}
