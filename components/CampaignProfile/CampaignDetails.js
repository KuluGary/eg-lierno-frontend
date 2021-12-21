import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Avatar, Container, HTMLContainer } from "components";

export function CampaignDetails({ campaign, dm, players, characters }) {
  return (
    <Grid item laptop={12} container spacing={2}>
      <Grid item laptop={4}>
        <Container sx={{ minHeight: "35vw" }}>
          <List>
            {!!dm && (
              <ListItem>
                <ListItemIcon>
                  <Avatar  src={dm.metadata?.avatar} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1">Dungeon Master</Typography>
                  <Typography variant="caption">{dm.name}</Typography>
                </ListItemText>
              </ListItem>
            )}
            {players?.map(({ name, id }, index) => {
              const character = characters?.find((character) => character["createdBy"] === id);
              return (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Avatar src={character?.flavor?.portrait?.avatar} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">{character?.name}</Typography>
                    <Typography variant="caption">{name}</Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Container>
      </Grid>
      <Grid item laptop={8}>
        <Container sx={{ minHeight: "35vw" }}>
          <HTMLContainer content={campaign?.flavor?.synopsis} />
        </Container>
      </Grid>
    </Grid>
  );
}
