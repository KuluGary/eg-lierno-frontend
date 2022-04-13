import { Add, DoubleArrow, ScreenShareOutlined } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tab,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Avatar, Container, TabletopCanvas } from "components";
import { Table } from "components/Table";
import Api from "helpers/api";
import { useSocket } from "hooks/useSocket";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function AddElementModal({ open, setOpen, creatures, addNewCreature }) {
  const [tabIndex, setTabIndex] = useState(0);
  const keyTranslator = { npcs: "PNJs", monsters: "Monstruos", characters: "Personajes" };

  return (
    <Dialog open={open} onClose={() => setOpen((prevOpen) => !prevOpen)}>
      <DialogTitle>Añadir un elemento al orden de iniciativa</DialogTitle>
      <Divider />
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        aria-label="basic tabs example"
      >
        {Object.keys(creatures).map((key) => (
          <Tab key={key} label={keyTranslator[key]} />
        ))}
      </Tabs>
      {Object.keys(creatures).map((key, index) => (
        <Box
          key={key}
          component="div"
          role="tabpanel"
          hidden={tabIndex !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          <Table
            schema={{
              _id: "_id",
              name: "name",
              owner: "*",
            }}
            onEdit={(id) => addNewCreature(id, key)}
            data={creatures[key]}
          />
        </Box>
      ))}
    </Dialog>
  );
}

function CampaignTabletop({ campaign, dm, players, characters }) {
  const [orderables, setOrderables] = useState([]);
  const [openAddElementModal, setOpenAddElementModal] = useState(false);
  const [creatures, setCreatures] = useState({});
  const [currentTurn, setCurrentTurn] = useState(0);
  const { data: session } = useSession();
  const socket = useSocket();

  useEffect(() => fetchNewCreatures(), []);

  useEffect(() => {
    socket.on("add-element-initiative", ({ element, key }) => {
      addNewCreature(element._id, key);
    });

    return () => socket.off("add-element-initiative");
  }, [socket]);

  const fetchNewCreatures = async () => {
    const newCreatures = {
      npcs: await Api.fetchInternal("/campaigns/" + campaign._id + "/npcs"),
      monsters: await Api.fetchInternal("/campaigns/" + campaign._id + "/monsters"),
      characters,
    };

    setCreatures(newCreatures);
  };

  const addNewCreature = (id, key) => {
    const newElement = creatures[key].find((creature) => creature._id === id);
    switch (key) {
      case "npcs":
      case "monsters":
        setOrderables((prevOrderables) => [
          ...prevOrderables,
          { id, portrait: newElement?.flavor?.portrait?.original, title: newElement?.name },
        ]);
        setOpenAddElementModal(false);
        break;
      case "characters":
      default:
        const player = players?.find((player) => newElement["createdBy"] === player.id);

        setOrderables((prevOrderables) => [
          ...prevOrderables,
          { id, portrait: newElement?.flavor.portrait.original, title: newElement?.name, subtitle: player?.name },
        ]);
        setOpenAddElementModal(false);
    }

    if (campaign?.discordData) {
      socket.emit("add-element-initiative", {
        recipients: [...players].map(({ id }) => id),
        channel: campaign?.discordData?.main,
        element: newElement,
        key,
      });
    }
  };

  const handleTurnChange = () => {
    let nextTurn = currentTurn + 1;

    if (nextTurn > orderables.length - 1) {
      nextTurn = 0;
    }

    if (campaign?.discordData) {
      socket.emit("change-turn", {
        recipients: [...players, dm].map(({ id }) => id),
        channel: campaign?.discordData?.main,
        creature: orderables[nextTurn],
        turn: nextTurn,
      });
    }

    setCurrentTurn(nextTurn);
  };

  return (
    <Grid item laptop={12} container spacing={2}>
      <AddElementModal
        addNewCreature={addNewCreature}
        open={openAddElementModal}
        setOpen={setOpenAddElementModal}
        creatures={creatures}
      />
      <Grid item laptop={4}>
        <Container noPadding sx={{ height: "71vh" }}>
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="h6">Orden de iniciativa</Typography>
                      <Typography variant="subtitle1">Turno de {orderables[currentTurn]?.title}</Typography>
                    </Box>

                    {session?.userId === dm.id && (
                      <Box>
                        <IconButton onClick={() => setOpenAddElementModal((prevOpen) => !prevOpen)}>
                          <Add />
                        </IconButton>
                        <IconButton onClick={handleTurnChange}>
                          <DoubleArrow />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!dm && (
                <TableRow>
                  <TableCell sx={{ width: "5em" }}>
                    <Avatar src={dm.metadata?.avatar} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">Dungeon Master</Typography>
                    <Typography variant="caption">{dm.name}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "5em" }} />
                </TableRow>
              )}
              {(orderables ?? [])
                .sort((a, b) => (b.initiative ?? 0) - (a.initiative ?? 0))
                .map((orderable, index) => (
                  <TableRow selected={currentTurn === index}>
                    <TableCell sx={{ width: "5em" }}>
                      <Avatar src={orderable.portrait} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{orderable?.title}</Typography>
                      <Typography variant="caption">{orderable?.subtitle}</Typography>
                    </TableCell>
                    <TableCell sx={{ width: "5em" }}>
                      <TextField
                        value={orderable.initiative ?? 0}
                        fullWidth
                        sx={{ width: "5em" }}
                        type="number"
                        InputProps={{
                          readOnly: !(session?.userId === dm.id) && !(session?.userId === orderable.id),
                        }}
                        onChange={(e) => {
                          let newOrderables = [...orderables];
                          newOrderables[index].initiative = parseInt(e.target.value);

                          setOrderables(newOrderables);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </MuiTable>
        </Container>
      </Grid>
      <Grid item laptop={8} container spacing={2}>
        <TabletopCanvas />
        {/* <Container
          noPadding
          sx={{
            height: "100%",
            display: "flex",
            flexGrow: 1,
            width: "100%",
            flexDirection: "column",
            div: {
              height: "100%",
              width: "100%",
            },
          }}
        >
        
        </Container> */}
      </Grid>
    </Grid>
  );
}

export { CampaignTabletop };
