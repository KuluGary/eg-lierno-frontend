import { Grid } from "@mui/material";
import { Container } from "components";

export function CampaignMap({ campaign }) {
  return (
    <Grid item laptop={12} container spacing={2}>
      <Grid item laptop={12}>
        <Container sx={{ height: "35vw" }}>
          <iframe style={{ border: "none", height: "32vw", width: "100%", borderRadius: "12px" }} src={campaign.flavor.map} />
        </Container>
      </Grid>
    </Grid>
  );
}
