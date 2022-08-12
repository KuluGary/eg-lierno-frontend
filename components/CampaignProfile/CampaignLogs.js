import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { Avatar, Container, HTMLContainer } from "components";
import Api from "services/api";
import { useEffect, useRef, useState } from "react";

const MessageContainer = ({ message, getAvatar, getDisplayName }) => {
  const avatar = getAvatar(message.author);
  const displayName = getDisplayName(message.author);
  let newContent = message.content;

  const discordIdRegex = /<@\d+>/;

  if (discordIdRegex.test(message.content)) {
    const idInContent = message.content.match(/\d+/);

    const nameToReplace = getDisplayName({ id: idInContent[0] });

    newContent = message.content.replace(discordIdRegex, "@" + nameToReplace);
  }

  return (
    <ListItem sx={{ marginBlock: "1em" }}>
      <Box component="div" sx={{ display: "flex" }}>
        <ListItemIcon>
          <Avatar size={36} src={avatar} />
        </ListItemIcon>
        <Box component="div">
          <Box component="div" sx={{ display: "flex", alignItems: "flex-end" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{`${displayName}`}</Typography>
            <Typography variant="caption" sx={{ marginInline: "1em" }}>{`${message.timestamp.replace(
              /T.*$/,
              ""
            )}`}</Typography>
          </Box>
          <Box component="div">
            <HTMLContainer content={newContent} />
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export function CampaignLogs({ campaign, dm, players, characters }) {
  const [logs, setLogs] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(logs[0]?.id ?? null);

  useEffect(() => {
    Api.fetchInternal("/logs/" + campaign._id).then((res) => setLogs(res));
  }, []);

  const getAvatar = (author) => {
    if (dm?.metadata?.discordId === author?.id) {
      return dm.metadata?.avatar;
    } else if (!!players) {
      const selectedPlayer = players.find((player) => player.metadata?.discordId === author.id);

      if (!!selectedPlayer) {
        const selectedCharacter = characters.find((character) => character.createdBy === selectedPlayer.id);
        if (!!selectedChannel) {
          return selectedCharacter?.flavor.portrait?.avatar;
        }
      }
    }

    return null;
  };

  const getDisplayName = (author) => {
    if (dm && dm.metadata.discordId === author.id) {
      return "Dungeon Master";
    } else if (players) {
      const selectedPlayer = players.find((player) => player.metadata.discordId === author.id);
      if (selectedPlayer) {
        const selectedCharacter = characters.find((character) => character.createdBy === selectedPlayer.id);

        if (selectedCharacter) {
          return selectedCharacter.name;
        } else {
          return author.name;
        }
      } else {
        return author.displayname;
      }
    } else {
      return author.displayname;
    }
  };

  return (
    <Grid item laptop={12} container spacing={2}>
      <Grid item laptop={3}>
        <Container sx={{ height: "35vw" }}>
          <List>
            {logs?.map(({ _id, name }, index) => (
              <ListItemButton key={index} selected={selectedChannel === _id} onClick={() => setSelectedChannel(_id)}>
                {name}
              </ListItemButton>
            ))}
          </List>
        </Container>
      </Grid>
      <Grid item laptop={9}>
        <Container sx={{ height: "35vw" }}>
          <List>
            {logs
              .find((log) => log._id === selectedChannel)
              ?.messages?.map((message, index) => (
                <MessageContainer key={index} message={message} getAvatar={getAvatar} getDisplayName={getDisplayName} />
              ))
              .reverse()}
            <AlwaysScrollToBottom />
          </List>
        </Container>
      </Grid>
    </Grid>
  );
}
