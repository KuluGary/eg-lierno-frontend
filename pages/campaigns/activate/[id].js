import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Container, Layout } from "components";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import { useState } from "react";
import Api from "services/api";

export default function ActivateCampaign({ campaign, characters }) {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState(false);

  const handleSubmit = async () => {
    const campaignData = await Api.fetchInternal("/campaigns/" + campaign._id);

    const newCampaign = { ...campaignData };
    newCampaign.characters.push(selectedCharacter);

    Api.fetchInternal(`/campaigns/${newCampaign._id}`, {
      method: "PUT",
      body: JSON.stringify(newCampaign),
    }).then(() => router.push("/campaigns/" + newCampaign._id));
  };

  return (
    <Layout>
      <Container>
        <Typography component="h3" variant="h5">
          Aceptar invitacion a {campaign.name}
        </Typography>
        <Box sx={{ margin: "2em 3em" }}>
          <FormControl fullWidth>
            <InputLabel id="character-select-label">Personaje seleccionado</InputLabel>

            <Select
              color="secondary"
              labelId="character-select-label"
              label="Personaje seleccionado"
              id="character-select"
              value={selectedCharacter}
              onChange={(e) => setSelectedCharacter(e.target.value)}
            >
              {characters.data.map(({ _id, name }, index) => (
                <MenuItem key={index} value={_id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleSubmit}
            disabled={!selectedCharacter}
            sx={{ marginBlock: "2em", float: "right" }}
          >
            Guardar
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const secret = process.env.SECRET;

  const token = await getToken({ req, secret, raw: true }).catch((e) => console.error(e));

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    withCredentials: true,
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const campaign = await Api.fetchInternal("/campaigns/" + query.id, {
    headers,
  });

  const characters = await Api.fetchInternal("/characters/", {
    headers,
  });

  return {
    props: {
      campaign,
      characters,
    },
  };
}
