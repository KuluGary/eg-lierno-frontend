import { Grid, Typography, Table, TableCell, Divider, Box, TextField, Autocomplete, Button } from "@mui/material";
import { DragDropTable } from "components/DragDropComponents";
import { FullScreenModal } from "components/Modal";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Container } from "../";
import { AddButton, EditButton, DeleteButton } from "../Buttons";

const Modal = ({ open, onClose, section, selectedIndex, creature, onSave, items }) => {
  const [content, setContent] = useState({ id: "", equipped: true, quantity: 1 });
  //   const content = { name: "", equipped: true, quantity: 1 };

  useEffect(() => {
    if (!!section && selectedIndex !== null) {
      const selectedItem = creature.stats.equipment[section][selectedIndex];

      setContent({ ...selectedItem });
    }
  }, []);

  const sectionTitles = {
    items: "Objeto",
    armor: "Armadura",
    weapons: "Arma",
    magicItems: "Objeto mágico",
    magicWeapons: "Arma mágica",
    vehicles: "Vehículo",
  };

  const getSelectedItem = () => {
    if (!!section && selectedIndex !== null) {
      const selectedId = creature.stats.equipment[section][selectedIndex]?.id;

      if (!!selectedId) {
        const selectedItem = items.find((item) => item._id === selectedId);

        if (!!selectedItem) return selectedItem;
      }
    }

    return null;
  };

  return (
    <FullScreenModal
      open={open}
      onClose={onClose}
      containerStyles={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      <Grid container spacing={3}>
        <Grid item laptop={12}>
          <Typography variant="h5" component="h1">
            {`Añade un ${sectionTitles[section]?.toLowerCase()} a tu personaje`}
          </Typography>
        </Grid>
        <Grid item laptop={10}>
          <Box>
            <Autocomplete
              freeSolo
              id={`${section}-name`}
              filterSelectedOptions
              value={getSelectedItem()}
              getOptionLabel={(option) => option.name}
              options={items.filter((item) => item.type === section)}
              renderInput={(params) => (
                <TextField color="secondary" {...params} label={`Nombre de ${sectionTitles[section]?.toLowerCase()}`} />
              )}
              onChange={(event, newData) => {
                const value = event.target.value;

                if (typeof value === "string") {
                  setTimeout(() => {});
                } else {
                  const { _id } = newData;

                  setContent((prev) => ({ ...prev, id: _id }));
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item laptop={2}>
          <TextField
            fullWidth
            required
            type="number"
            color="secondary"
            value={content.quantity}
            label={"Cantidad"}
            InputProps={{
              inputProps: { min: 0, style: { textAlign: "center" } },
            }}
            onChange={(event) =>
              setContent(prev => ({
                  ...prev,
                  quantity: parseInt(event.target.value)
              }))
            }
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: "1em" }}>
        <Button sx={{ marginInline: ".5em" }} onClick={onClose}>
          Cancelar
        </Button>
        <Button
          disabled={!content.id}
          sx={{ marginInline: ".5em" }}
          onClick={() => {
            onSave(content, section, selectedIndex);
            onClose();
          }}
          variant="outlined"
          color="secondary"
        >
          Guardar
        </Button>
      </Box>
    </FullScreenModal>
  );
};

const Section = ({ data, title, onDragEnd, section, setModalOpen, setSelectedIndex, items, onDelete }) => {
  return (
    <Container noPadding sx={{ marginBlock: "1em" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: ".75em" }}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <AddButton onClick={() => setModalOpen(section)} />
      </Box>
      <Divider />
      <Table sx={{ minHeight: "2em" }}>
        <DragDropTable
          id={section}
          onDragEnd={(ev) => onDragEnd(ev, data, section)}
          items={data?.map((element, index) => {
            const { name } = items.find((item) => item._id === element.id);

            return {
              id: name,
              content: (
                <>
                  <TableCell sx={{ width: 1000 }}>
                    <Typography variant="body1">{name}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: 1000 }} align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <EditButton
                        onClick={() => {
                          setSelectedIndex(index);
                          setModalOpen(section);
                        }}
                      />
                      <DeleteButton onClick={() => onDelete(section, index)} />
                    </Box>
                  </TableCell>
                </>
              ),
            };
          })}
        />
      </Table>
    </Container>
  );
};

export function Equipment({ creature, setCreature, items }) {
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const reorderEquipment = (equipment, source, destination) => {
    if (source.droppableId === destination.droppableId) {
      const result = Array.from(equipment);
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);

      return setCreature(`stats.equipment.${destination.droppableId}`, result);
    } else {
      const current = creature.stats.equipment[source.droppableId];
      const next = creature.stats.equipment[destination.droppableId];
      const target = current[source.index];

      current.splice(source.index, 1);
      next.splice(destination.index, 0, target);

      setCreature(`stats.equipment.${source.droppableId}`, current);
      setCreature(`stats.equipment.${destination.droppableId}`, next);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    reorderEquipment(creature?.stats.equipment[source.drippableId], source, destination);
  };

  const onDelete = (section, index) => {
    if (!section || index === null) return;

    const newElements = [...creature?.stats.equipment[section]];

    newElements.splice(index, 1);

    setCreature(`stats.equipment.${section}`, newElements);
  };

  return (
    <Grid container spacing={3}>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Equipamiento del personaje
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: ".25em" }}>
          Añade los objetos del personaje.
        </Typography>
      </Grid>
      <Grid item laptop={12}>
        <Modal
          open={!!modalOpen}
          onClose={() => {
            setModalOpen(null);
            setSelectedIndex(null);
          }}
          items={items}
          section={modalOpen}
          selectedIndex={selectedIndex}
          creature={creature}
          onSave={(content, section, index) => {
            const newArray = creature?.stats.equipment[section] ?? [];

            if (index !== null) {
              newArray[index] = content;
            } else {
              newArray.push(content);
            }

            setCreature(`stats.equipment.${section}`, newArray);
          }}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries({
            items: {
              title: "Objetos",
              content: creature?.stats.equipment.items ?? [],
            },
            armor: {
              title: "Armadura",
              content: creature?.stats.equipment.armor ?? [],
            },
            weapons: {
              title: "Armas",
              content: creature?.stats.equipment.weapons ?? [],
            },
            magicItems: {
              title: "Objetos mágicos",
              content: creature?.stats.equipment.magicItems ?? [],
            },
            magicWeapons: {
              title: "Armas mágicas",
              content: creature?.stats.equipment.magicWeapons ?? [],
            },
            vehicles: {
              title: "Vehículos",
              content: creature?.stats.equipment.vehicles ?? [],
            },
          }).map(([key, { title, content }]) => (
            <Section
              key={key}
              data={content}
              title={title}
              section={key}
              onDelete={onDelete}
              onDragEnd={onDragEnd}
              setModalOpen={setModalOpen}
              setSelectedIndex={setSelectedIndex}
              setCreature={setCreature}
              items={items}
            />
          ))}
        </DragDropContext>
      </Grid>
    </Grid>
  );
}
