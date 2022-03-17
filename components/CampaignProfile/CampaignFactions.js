import { Grid } from "@mui/material";
import { Container } from "components/Container/Container";
import { Table } from "components/Table";
import Api from "helpers/api";
import { useEffect, useState } from "react";

export function CampaignFactions({ campaign }) {
  const [factions, setFactions] = useState();

  useEffect(() => fetchNewFactions(), []);

  const fetchNewFactions = async () => {
    const newFactions = await Api.fetchInternal("/campaigns/factions/" + campaign._id);

    setFactions(newFactions);
  };

  return (
    <Grid item laptop={12} container spacing={2}>
      <Grid item laptop={12}>
        <Container noPadding>
          {!!factions && (
            <Table
              schema={{
                _id: "_id",
                name: "name",
                avatar: "image",
                description: "description",
                owner: "createdBy",
              }}
              data={factions}
              src={"/factions/{ID}"}
            />
          )}
        </Container>
      </Grid>
    </Grid>
  );
}
