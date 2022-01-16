import { Grid, Typography, Table, TableCell, Divider, Box } from "@mui/material";
import { DragDropTable } from "components/DragDropComponents";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Container } from "../";
import { AddButton, EditButton, DeleteButton } from "../Buttons";
import { Ability, Attack, Spell } from "./AbilityCreation";

const Modal = (props) => {
  const { section } = props;

  switch (section) {
    case "spells":
      return <Spell {...props} />;
    case "attacks":
      return <Attack {...props} />;
    default:
      return <Ability {...props} />;
  }
};

const Section = ({ data, title, onDragEnd, section, setModalOpen, setSelectedIndex, classes, onDelete }) => {
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
            let name = element.name;

            if (section === "spells") {
              if (!!classes) {
                const caster = classes.find((charClass) => charClass._id === element.caster)?.name;
                
                name = "Lanzamiento de conjuros " + caster?.toLowerCase();
              } else {
                name = "Lanzamiento de conjuros";
              }
            }

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

export function Abilities({ creature, setCreature, classes }) {
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const reorderSkills = (items, source, destination) => {
    if (source.droppableId === destination.droppableId) {
      const result = Array.from(items);
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);

      return setCreature(`stats.${destination.droppableId}`, result);
    } else {
      const current = creature.stats[source.droppableId];
      const next = creature.stats[destination.droppableId] ?? [];
      const target = current[source.index];

      current.splice(source.index, 1);
      next.splice(destination.index, 0, target);

      setCreature(`stats.${source.droppableId}`, current);
      setCreature(`stats.${destination.droppableId}`, next);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    reorderSkills(creature?.stats[source.droppableId], source, destination);
  };

  const onDelete = (section, index) => {
    if (!section || index === null) return;

    const newElements = [...creature?.stats[section]];

    newElements.splice(index, 1);

    setCreature(`stats.${section}`, newElements);
  }

  return (
    <Grid container spacing={3}>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Habilidades de personaje
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: ".25em" }}>
          Añade las habilidades del personaje.
        </Typography>
      </Grid>
      <Grid item laptop={12}>
        <Modal
          open={!!modalOpen}
          onClose={() => {
            setModalOpen(null);
            setSelectedIndex(null);
          }}
          classes={classes}
          section={modalOpen}
          selectedIndex={selectedIndex}
          creature={creature}
          onSave={(content, section, index) => {
            const newArray = creature?.stats[section] ?? [];

            if (index !== null) {
              newArray[index] = content;
            } else {
              newArray.push(content);
            }

            setCreature(`stats.${section}`, newArray);
          }}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries({
            attacks: {
              title: "Ataques",
              content: creature?.stats.attacks,
            },
            actions: {
              title: "Acciones",
              content: creature?.stats.actions,
            },
            bonusActions: {
              title: "Acciones adicionales",
              content: creature?.stats.bonusActions,
            },
            additionalAbilities: {
              title: "Habilidades",
              content: creature?.stats.additionalAbilities,
            },
            reactions: {
              title: "Reacciones",
              content: creature?.stats.reactions,
            },
            spells: {
              title: "Hechizos",
              content: creature?.stats.spells,
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
              classes={classes}
            />
          ))}
        </DragDropContext>
      </Grid>
    </Grid>
  );
}
