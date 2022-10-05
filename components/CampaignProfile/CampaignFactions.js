import { Grid } from "@mui/material";
import { Container } from "components/Container/Container";
import { Table } from "components/Table";
import Api from "services/api";
import { useEffect, useState } from "react";
import { getNestedKey } from "@lierno/core-helpers";

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
              getRowData={(element) => ({
                _id: getNestedKey("_id", element),
                name: getNestedKey("name", element),
                avatar: getNestedKey("image", element),
                description: getNestedKey("description", element),
                owner: getNestedKey("createdBy", element),
              })}
              data={factions}
              src={"/factions/{ID}"}
            />
          )}
        </Container>
      </Grid>
    </Grid>
  );
}
