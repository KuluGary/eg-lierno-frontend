import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { HTMLEditor } from "components";
import { FullScreenModal } from "components/Modal";
import { spellcasters, statLabels } from "helpers/creature-calculations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Api from "services/api";
import { ModalFooter, ModalHeader } from ".";

const schoolOptions = [
  "Abjuración",
  "Adivinación",
  "Conjuración",
  "Encantamiento",
  "Evocación",
  "Ilusión",
  "Nigromancia",
  "Transmutación",
];

export function Spell({ open, onClose, section, selectedIndex, creature, classes, onSave }) {
  const [spellAutocomplete, setSpellAutocomplete] = useState([]);
  const [spellLevelArray] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [spellcasting, setSpellcasting] = useState({
    modifier: "intelligence",
    caster: "00000",
    level: 1,
    spells: {},
  });
  const [dialogOpen, toggleDialogOpen] = useState(false);
  const [spellToAdd, setSpellToAdd] = useState({
    name: "",
    public: true,
    stats: {},
  });
  const [sectionToAdd, setSectionToAdd] = useState(null);
  const spellcaster =
    classes.find((charClass) => charClass._id === spellcasting.caster)?.spellcasting ?? spellcasters["00000"];
  const router = useRouter();
  const isCharacter = router.pathname.includes("characters");

  useEffect(() => fetchApiSpells(), []);

  const fetchApiSpells = () => Api.fetchInternal("/spells").then((res) => setSpellAutocomplete(res));

  useEffect(() => {
    if (!!section && selectedIndex !== null && spellAutocomplete.length > 0) {
      const spellToSet = { ...creature.stats[section][selectedIndex] };

      const spellsMapped = { ...spellToSet.spells };

      Object.keys(spellsMapped).forEach((key) => {
        spellsMapped[key] = spellsMapped[key].map((a) => {
          const spellData = spellAutocomplete.find((b) => b._id === a.spellId);

          return spellData;
        });
      });

      spellToSet["spells"] = spellsMapped;

      setSpellcasting(spellToSet);
    }
  }, [section, selectedIndex, spellAutocomplete]);

  const getSpellLevelText = (level) => {
    const { cantripsKnown } = spellcaster.level[spellcasting.level];

    if (level === 0) return `Trucos (conoce ${cantripsKnown})`;

    return `Hechizos de nivel ${level} (${spellcaster.level[spellcasting.level].spellSlots[level - 1]} huecos)`;
  };

  const hasSpellSlotsOfLevel = (level) => {
    if (spellcasting.caster) {
      if (level === 0) {
        return spellcaster.level[spellcasting.level]?.cantripsKnown > 0;
      } else if (spellcasting.level) {
        let spellSlots = spellcaster.level[spellcasting.level]?.spellSlots;
        if (spellSlots?.hasOwnProperty(level - 1) && spellSlots[level - 1] !== 0) {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getHighestSpellSlotLevel = () => {
    if (spellcasting.caster) {
      if (spellcasting.level) {
        let spellSlots = spellcaster?.level[spellcasting.level]?.spellSlots;

        return spellSlots.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const getWarlockSpells = () => {
    const warlockSpells = [];

    for (const spellLevel in spellcasting.spells) {
      if (spellLevel === "0") continue;

      warlockSpells.push(...spellcasting.spells[spellLevel]);
    }

    return warlockSpells;
  };

  const handleClose = () => {
    setSpellToAdd({
      name: "",
      stats: {},
    });

    toggleDialogOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const levelToAdd = sectionToAdd ?? spellToAdd.stats.level;

    const newSpellToAdd = { ...spellToAdd };
    newSpellToAdd.stats.components.type = (newSpellToAdd.stats.components?.type ?? []).join(",");

    Api.fetchInternal("/spell", {
      method: "POST",
      body: JSON.stringify(newSpellToAdd),
    }).then((res) => {
      fetchApiSpells();

      setSpellcasting({
        _id: res,
        ...spellcasting,
        spells: {
          ...spellcasting.spells,
          [levelToAdd]: [...(spellcasting.spells[levelToAdd] ?? []), newSpellToAdd],
        },
      });

      setSectionToAdd(null);
    });

    handleClose();
  };

  return (
    <FullScreenModal
      open={open}
      onClose={onClose}
      containerStyles={{ p: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      <Dialog open={dialogOpen} onClose={handleClose}>
        <form
          onSubmit={handleSubmit}
          style={{
            minWidth: "50vw",
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle>Añade un nuevo hechizo</DialogTitle>
          <DialogContent>
            <DialogContentText>¿El hechizo que buscas no está en la lista? Añádelo.</DialogContentText>
            <Grid container spacing={2}>
              <Grid container item laptop={8} spacing={2} sx={{ mt: "1em" }}>
                <Grid item laptop={5}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    label={"Nombre del hechizo"}
                    value={spellToAdd.name}
                    onChange={(e) => setSpellToAdd({ ...spellToAdd, name: e.target.value })}
                  />
                </Grid>
                <Grid item laptop={2}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    color="secondary"
                    value={spellToAdd?.stats?.level ?? 0}
                    label={"Nivel"}
                    InputProps={{
                      inputProps: { min: 0, max: 9, style: { textAlign: "center" } },
                    }}
                    onChange={(event) =>
                      setSpellToAdd({
                        ...spellToAdd,
                        stats: { ...(spellToAdd.stats ?? {}), level: event.target.value },
                      })
                    }
                  />
                </Grid>
                <Grid item laptop={5}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel id="school-label">Escuela</InputLabel>
                    <Select
                      fullWidth
                      required
                      color="secondary"
                      value={spellToAdd?.stats?.school}
                      onChange={(event) =>
                        setSpellToAdd({
                          ...spellToAdd,
                          stats: {
                            ...(spellToAdd.stats ?? {}),
                            school: event.target.value,
                          },
                        })
                      }
                      id="school-label"
                      label="Escuela"
                    >
                      {schoolOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item laptop={4}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    value={spellToAdd?.stats?.castingTime}
                    label={"T. de lanzamiento"}
                    onChange={(event) =>
                      setSpellToAdd({
                        ...spellToAdd,
                        stats: {
                          ...spellToAdd.stats,
                          castingTime: event.target.value,
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item laptop={4}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    label={"Duración"}
                    value={spellToAdd?.stats.duration}
                    onChange={(event) =>
                      setSpellToAdd({
                        ...spellToAdd,
                        stats: {
                          ...spellToAdd.stats,
                          duration: event.target.value,
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item laptop={4}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    value={spellToAdd?.stats.range}
                    label={"Alcance"}
                    onChange={(event) =>
                      setSpellToAdd({
                        ...spellToAdd,
                        stats: {
                          ...spellToAdd.stats,
                          range: event.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid item laptop={4}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={spellToAdd.public}
                        onClick={() => {
                          setSpellToAdd((spellToAdd) => {
                            return { ...spellToAdd, public: !spellToAdd.public };
                          });
                        }}
                        inputProps={{ "aria-label": "Público" }}
                      />
                    }
                    label="Público"
                  />
                  <Divider sx={{ marginBlock: ".5rem" }} />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={spellToAdd.stats?.components?.type?.includes("V") ?? false}
                        onClick={() => {
                          let spellComponents = [...(spellToAdd.stats?.components?.type ?? [])];

                          spellComponents.includes("V")
                            ? (spellComponents = spellComponents.filter((e) => e !== "V"))
                            : spellComponents.push("V");

                          setSpellToAdd({
                            ...spellToAdd,
                            stats: {
                              ...spellToAdd.stats,
                              components: {
                                ...(spellToAdd.stats?.components ?? {}),
                                type: spellComponents,
                              },
                            },
                          });
                        }}
                      />
                    }
                    label={"Verbal"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={spellToAdd.stats?.components?.type?.includes("S") ?? false}
                        onClick={() => {
                          let spellComponents = [...(spellToAdd.stats?.components?.type ?? [])];

                          spellComponents.includes("S")
                            ? (spellComponents = spellComponents.filter((e) => e !== "S"))
                            : spellComponents.push("S");

                          setSpellToAdd({
                            ...spellToAdd,
                            stats: {
                              ...spellToAdd.stats,
                              components: {
                                ...(spellToAdd.stats?.components ?? {}),
                                type: spellComponents,
                              },
                            },
                          });
                        }}
                      />
                    }
                    label={"Somático"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={spellToAdd.stats?.components?.type?.includes("M") ?? false}
                        onClick={() => {
                          let spellComponents = [...(spellToAdd.stats?.components?.type ?? [])];

                          spellComponents.includes("M")
                            ? (spellComponents = spellComponents.filter((e) => e !== "M"))
                            : spellComponents.push("M");

                          setSpellToAdd({
                            ...spellToAdd,
                            stats: {
                              ...spellToAdd.stats,
                              components: {
                                ...(spellToAdd.stats?.components ?? {}),
                                type: spellComponents,
                              },
                            },
                          });
                        }}
                      />
                    }
                    label={"Material"}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item laptop={12}>
                <TextField
                  fullWidth
                  multiline
                  color="secondary"
                  label={"Descripción de los componentes"}
                  value={spellToAdd?.stats?.components?.description ?? ""}
                  onChange={(event) => {
                    setSpellToAdd({
                      ...spellToAdd,
                      stats: {
                        ...spellToAdd?.stats,
                        components: {
                          ...(spellToAdd?.stats?.components ?? {}),
                          description: event.target.value,
                        },
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item laptop={12}>
                <HTMLEditor
                  multiline
                  color="secondary"
                  placeholder={"Descripción del hechizo"}
                  value={spellToAdd?.stats?.description ?? ""}
                  onChange={(content) =>
                    setSpellToAdd({
                      ...spellToAdd,
                      stats: {
                        ...spellToAdd.stats,
                        description: content,
                      },
                    })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ m: 1 }}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" color="secondary" variant="outlined">
              Añadir
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Grid container spacing={3}>
        <ModalHeader section={section} />
        <Grid item laptop={8} container spacing={3} sx={{ marginInline: 1 }}>
          <Grid item laptop={6}>
            <FormControl fullWidth>
              <InputLabel id="spellcaster-select-label">Tipo de hechicero</InputLabel>
              <Select
                color="secondary"
                labelIid="spellcaster-select-label"
                id="spellcaster-select"
                label="Tipo de hechicero"
                value={spellcasting.caster}
                onChange={(e) => {
                  const selectedClass = classes.find((charClass) => charClass._id === e.target.value);
                  const newSpellcasting = selectedClass.spellcasting;

                  setSpellcasting({
                    ...spellcasting,
                    caster: e.target.value,
                    modifier: newSpellcasting.ability,
                  });
                }}
              >
                {!isCharacter &&
                  classes.map(({ _id, name }) => (
                    <MenuItem key={_id} value={_id}>
                      <Typography variant="body1">{name}</Typography>
                    </MenuItem>
                  ))}
                {isCharacter &&
                  classes.map(({ _id, name }) => (
                    <MenuItem key={_id} value={_id}>
                      <Typography variant="body1">{name}</Typography>
                    </MenuItem>
                  ))}
                <MenuItem key={"00000"} value={"00000"}>
                  <Typography variant="body1">{"Innato"}</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item laptop={3}>
            <FormControl fullWidth>
              <InputLabel id="spellcaster-ability-select-label">Habilidad</InputLabel>
              <Select
                color="secondary"
                labelIid="spellcaster-ability-select-label"
                id="spellcaster-ability-select"
                label="Habilidad"
                value={spellcasting.modifier}
                onChange={(e) => setSpellcasting({ ...spellcasting, modifier: e.target.value })}
              >
                {Object.keys(creature?.stats.abilityScores)?.map((key, index) => (
                  <MenuItem key={index} value={key}>
                    {statLabels[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item laptop={3}>
            <TextField
              fullWidth
              color="secondary"
              type="number"
              placeholder="Nivel de hechicero"
              InputProps={{ inputProps: { min: 1, max: 30 }, style: { textAlign: "center" } }}
              value={parseInt(spellcasting.level)}
              onChange={(e) => {
                setSpellcasting({ ...spellcasting, level: parseInt(e.target.value) });
              }}
            />
          </Grid>
          {spellLevelArray.length > 0 && (
            <>
              {spellcasting.caster === "00000" ? (
                <>
                  <Grid item laptop={12}>
                    <Autocomplete
                      freeSolo
                      multiple
                      fullWidth
                      id={"at-will"}
                      filterSelectedOptions
                      value={spellcasting.spells.atWill ?? []}
                      getOptionLabel={(option) => option.name}
                      options={spellAutocomplete.sort()}
                      renderInput={(params) => <TextField color="secondary" {...params} label={"A voluntad"} />}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip key={index} variant="outlined" label={option.name} {...getTagProps({ index })} />
                        ))
                      }
                      onChange={(event, newData) => {
                        const value = event.target.value;

                        if (typeof value === "string") {
                          setTimeout(() => {
                            toggleDialogOpen(true);
                            setSectionToAdd("atWill");
                            setSpellToAdd({
                              ...spellToAdd,
                              name: value,
                              stats: {
                                level: 0,
                              },
                            });
                          });
                        } else {
                          setSpellcasting({
                            ...spellcasting,
                            spells: { ...spellcasting.spells, atWill: newData },
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item laptop={12}>
                    <Autocomplete
                      freeSolo
                      multiple
                      fullWidth
                      id={"per-day-3"}
                      filterSelectedOptions
                      value={spellcasting.spells.perDay3 ?? []}
                      getOptionLabel={(option) => option.name}
                      options={spellAutocomplete.sort()}
                      renderInput={(params) => <TextField color="secondary" {...params} label={"3/día"} />}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip key={index} variant="outlined" label={option.name} {...getTagProps({ index })} />
                        ))
                      }
                      onChange={(event, newData) => {
                        const value = event.target.value;

                        if (typeof value === "string") {
                          setTimeout(() => {
                            toggleDialogOpen(true);
                            setSectionToAdd("perDay3");
                            setSpellToAdd({
                              ...spellToAdd,
                              name: value,
                              stats: {
                                level: 0,
                              },
                            });
                          });
                        } else {
                          setSpellcasting({
                            ...spellcasting,
                            spells: { ...spellcasting.spells, perDay3: newData },
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item laptop={12}>
                    <Autocomplete
                      freeSolo
                      multiple
                      fullWidth
                      id={"per-day-2"}
                      filterSelectedOptions
                      value={spellcasting.spells.perDay2 ?? []}
                      getOptionLabel={(option) => option.name}
                      options={spellAutocomplete.sort()}
                      renderInput={(params) => <TextField color="secondary" {...params} label={"2/día"} />}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip key={index} variant="outlined" label={option.name} {...getTagProps({ index })} />
                        ))
                      }
                      onChange={(event, newData) => {
                        const value = event.target.value;

                        if (typeof value === "string") {
                          setTimeout(() => {
                            toggleDialogOpen(true);
                            setSectionToAdd("perDay2");
                            setSpellToAdd({
                              ...spellToAdd,
                              name: value,
                              stats: {
                                level: "atWill",
                              },
                            });
                          });
                        } else {
                          setSpellcasting({
                            ...spellcasting,
                            spells: { ...spellcasting.spells, perDay2: newData },
                          });
                        }
                      }}
                    />
                  </Grid>
                  <Grid item laptop={12}>
                    <Autocomplete
                      freeSolo
                      multiple
                      fullWidth
                      id={"per-day-1"}
                      filterSelectedOptions
                      value={spellcasting.spells.perDay1 ?? []}
                      getOptionLabel={(option) => option.name}
                      options={spellAutocomplete.sort()}
                      renderInput={(params) => <TextField color="secondary" {...params} label={"1/día"} />}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip key={index} variant="outlined" label={option.name} {...getTagProps({ index })} />
                        ))
                      }
                      onChange={(event, newData) => {
                        const value = event.target.value;

                        if (typeof value === "string") {
                          setTimeout(() => {
                            toggleDialogOpen(true);
                            setSectionToAdd("perDay1");
                            setSpellToAdd({
                              ...spellToAdd,
                              name: value,
                              stats: {
                                level: 0,
                              },
                            });
                          });
                        } else {
                          setSpellcasting({
                            ...spellcasting,
                            spells: { ...spellcasting.spells, perDay1: newData },
                          });
                        }
                      }}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  {spellLevelArray.map(
                    (level) =>
                      hasSpellSlotsOfLevel(level) && (
                        <Grid item laptop={12}>
                          <Autocomplete
                            freeSolo
                            multiple
                            id={"level" + level}
                            filterSelectedOptions
                            value={spellcasting.spells[level] ?? []}
                            getOptionLabel={(option) => option.name}
                            options={spellAutocomplete.filter((spell) => spell.stats.level === level).sort()}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip key={index} variant="outlined" label={option.name} {...getTagProps({ index })} />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField color="secondary" {...params} label={getSpellLevelText(level)} />
                            )}
                            onChange={(event, newData) => {
                              const value = event.target.value;

                              if (typeof value === "string") {
                                setTimeout(() => {
                                  toggleDialogOpen(true);
                                  setSpellToAdd({
                                    ...spellToAdd,
                                    name: value,
                                    stats: {
                                      level: level,
                                    },
                                  });
                                });
                              } else {
                                setSpellcasting({
                                  ...spellcasting,
                                  spells: { ...spellcasting.spells, [level]: newData },
                                });
                              }
                            }}
                          />
                        </Grid>
                      )
                  )}
                </>
              )}
            </>
          )}
        </Grid>
        <Grid item laptop={3} sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={<Checkbox color="secondary" inputProps={{ "aria-label": "Material" }} />}
            label="Material"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" inputProps={{ "aria-label": "Somático" }} />}
            label="Somático"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" inputProps={{ "aria-label": "Verbal" }} />}
            label="Verbal"
          />
        </Grid>
      </Grid>
      <ModalFooter
        onClose={onClose}
        onSave={() => {
          const spellsMapped = { ...spellcasting.spells };

          Object.keys(spellsMapped).forEach((key) => {
            spellsMapped[key] = spellsMapped[key].map((el) => {
              return {
                spellId: el._id,
              };
            });
          });

          const spellCastingToSave = { ...spellcasting };
          spellCastingToSave["spells"] = spellsMapped;

          onSave(spellCastingToSave, section, selectedIndex);
        }}
      />
    </FullScreenModal>
  );
}
