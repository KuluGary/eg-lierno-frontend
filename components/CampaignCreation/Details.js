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
import Api from "helpers/api";
import { useEffect, useState } from "react";

export function Details({ campaign, setCampaign }) {
  const [friendList, setFriendList] = useState([]);
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    fetchFriendListData();
    fetchCharacterListData();
  }, [fetchCharacterListData]);

  useEffect(() => {
    fetchCharacterListData();
  }, [campaign.players, fetchCharacterListData]);

  const fetchFriendListData = async () => {
    Api.fetchInternal("/auth/me").then(async (res) => {
      const newFriendList = [];

      for await (const userId of res.metadata.friendList ?? []) {
        await Api.fetchInternal("/auth/users/" + userId).then((res) =>
          newFriendList.push({ label: res.username, id: userId })
        );
      }

      setFriendList(newFriendList);
    });
  };

  const fetchCharacterListData = async () => {
    if (campaign.players.length > 0) {
      const newCharacterList = [];

      for await (const userId of campaign.players ?? []) {
        await Api.fetchInternal("/user/" + userId + "/characters").then((res) => {
          newCharacterList.push(...res);
        });
      }

      if (campaign.dm) {
        await Api.fetchInternal("/user/" + campaign.dm + "/characters").then((res) => {
          newCharacterList.push(...res);
        });
      }

      setCharacterList(newCharacterList);
    }
  };

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
      <Grid item laptop={6}>
        <Autocomplete
          multiple
          id="tags-standard"
          value={campaign.players}
          options={friendList}
          getOptionLabel={(option) => option.label}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                variant="outlined"
                label={friendList.find((friend) => friend.id === option)?.label}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} color="secondary" variant="outlined" placeholder="Añadir jugadores" />
          )}
          onChange={(_, newData) => {
            setCampaign(
              "players",
              newData.map((element) => {
                if (typeof element === "string") return element;

                return element.id;
              })
            );
          }}
        />
      </Grid>
      <Grid item laptop={6}>
        <Autocomplete
          multiple
          id="tags-standard"
          value={campaign.characters}
          options={characterList}
          getOptionLabel={(option) => option.name}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                variant="outlined"
                label={characterList.find((friend) => friend._id === option)?.name}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} color="secondary" variant="outlined" placeholder="Añadir personajes" />
          )}
          onChange={(_, newData) => {
            setCampaign(
              "characters",
              newData.map((element) => {
                if (typeof element === "string") return element;

                return element.id;
              })
            );
          }}
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
