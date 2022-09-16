import { useTheme } from "@emotion/react";
import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Container } from "components";
import { FullScreenModal } from "components/Modal";
import { statLabels } from "helpers/creature-calculations";
import { useEffect, useState } from "react";
import { ModalFooter, ModalHeader } from ".";

const defaultFormData = {
  melee: {
    range: 5,
    type: "Cortante",
    numDie: 1,
    dieSize: 6,
  },
  distance: {
    range: {
      short: 20,
      long: 60,
    },
    type: "Perforante",
    numDie: 1,
    dieSize: 4,
  },
  versatile: {
    type: "Cortante",
    numDie: 1,
    dieSize: 8,
  },
  extraDamage: {
    type: "Cortante",
    numDie: 1,
    dieSize: 6,
  },
};

export function Attack({ open, onClose, section, selectedIndex, creature, onSave }) {
  const theme = useTheme();
  const [attack, setAttack] = useState({
    name: "",
    proficient: true,
    data: {
      modifier: "strength",
      damage: {},
    },
  });
  const [allowedSections, setAllowedSections] = useState({
    melee: false,
    distance: false,
    finesse: false,
    versatile: false,
    extraDamage: false,
  });

  useEffect(() => {
    if (!!section && selectedIndex !== null) {
      const selectedAttack = creature.stats[section][selectedIndex];

      if (selectedAttack) {
        setAttack(selectedAttack);

        const newAllowedSections = {};

        ["melee", "distance", "versatile", "extraDamage"].forEach((key) => {
          if (key in selectedAttack.data.damage) {
            newAllowedSections[key] = true;
          }
        });

        setAllowedSections(newAllowedSections);
      }
    }

    return () => {
      setAttack({
        name: "",
        proficient: true,
        data: {
          modifier: "strength",
          damage: {},
        },
      });

      setAllowedSections({
        melee: false,
        distance: false,
        finesse: false,
        versatile: false,
        extraDamage: false,
      });
    };
  }, [section, selectedIndex]);

  useEffect(() => {
    for (const section in allowedSections) {
      if (allowedSections[section] === false && section in attack.data.damage) {
        const newData = { ...attack };
        delete newData.data.damage[section];

        setAttack(newData);
      } else if (allowedSections[section] === true && section in attack.data.damage !== true) {
        const newData = { ...attack };
        newData.data.damage[section] = defaultFormData[section];

        setAttack(newData);
      }
    }
  }, [allowedSections]);

  const saveAndClose = () => {
    onSave(attack, section, selectedIndex);
    onClose();
  };

  return (
    <FullScreenModal
      open={open}
      onClose={onClose}
      containerStyles={{
        p: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        ...theme.mixins.noScrollbar,
      }}
    >
      <ModalHeader section={section} />
      <Grid container spacing={0} sx={{ flex: 1, alignItems: "flex-start" }}>
        <Grid item laptop={9} container spacing={1} sx={{ paddingBlock: 2 }}>
          <Grid item laptop={12}>
            <Box sx={{ marginInline: 2, marginBlock: 1 }}>
              <Grid item laptop={12} container spacing={2}>
                <Grid item laptop={9}>
                  <TextField
                    fullWidth
                    color="secondary"
                    placeholder="Nombre del ataque"
                    value={attack.name}
                    onChange={(e) => setAttack({ ...attack, name: e.target.value })}
                  />
                </Grid>
                <Grid item laptop={3}>
                  <FormControl fullWidth>
                    <InputLabel id="modifier-select-label">Mod. de habilidad</InputLabel>
                    <Select
                      color="secondary"
                      labelIid="modifier-select-label"
                      id="modifier-select"
                      label="Mod. de habilidad"
                      value={attack?.data.modifier}
                      onChange={(e) => setAttack({ ...attack, data: { ...attack.data, modifier: e.target.value } })}
                    >
                      {(Object.keys(creature?.stats.abilityScores) || []).map((key, index) => (
                        <MenuItem key={index} value={key}>
                          {statLabels[key]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item laptop={12}>
            <Collapse in={allowedSections.melee} {...(allowedSections.melee ? { timeout: 200 } : {})}>
              <Container header={"Ataque cuerpo a cuerpo"} sx={{ marginInline: 2, marginBlock: 1 }}>
                <Grid item laptop={12} container spacing={2}>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="Alcance"
                      type="number"
                      InputProps={{
                        endAdornment: <Box component="label">ft.</Box>,
                        inputProps: { min: 1 },
                      }}
                      value={attack?.data.damage.melee?.range ?? 5}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              melee: {
                                ...(attack.data.damage.melee ?? {}),
                                range: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="Tipo de daño"
                      value={attack?.data.damage?.melee?.type ?? "Cortante"}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              melee: {
                                ...(attack.data.damage.melee ?? {}),
                                type: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      type="number"
                      color="secondary"
                      label="N. de dados"
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      value={attack?.data.damage?.melee?.numDie ?? 1}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              melee: {
                                ...(attack.data.damage.melee ?? {}),
                                numDie: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      type="number"
                      color="secondary"
                      label="T. de dado"
                      InputProps={{
                        inputProps: { min: 4, max: 12, step: 2 },
                      }}
                      value={attack?.data.damage?.melee?.dieSize ?? 6}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              melee: {
                                ...(attack.data.damage.melee ?? {}),
                                dieSize: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      type="number"
                      color="secondary"
                      label="Bonificador al ataque"
                      value={attack?.data.damage?.melee?.attackBonus ?? 0}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              melee: {
                                ...(attack.data.damage.melee ?? {}),
                                attackBonus: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      type="number"
                      color="secondary"
                      label="Bonificador al daño"
                      value={attack?.data.damage?.melee?.damageBonus ?? 0}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              melee: {
                                ...(attack.data.damage.melee ?? {}),
                                damageBonus: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Container>
            </Collapse>
          </Grid>

          <Grid item laptop={12}>
            <Collapse in={allowedSections.distance} {...(allowedSections.distance ? { timeout: 200 } : {})}>
              <Container header={"Ataque a distancia"} sx={{ marginInline: 2, marginBlock: 1 }}>
                <Box sx={{ p: 2 }}>
                  <Grid item laptop={12} container spacing={2}>
                    <Grid item laptop={3}>
                      <TextField
                        fullWidth
                        color="secondary"
                        label="Alcance corto"
                        type="number"
                        InputProps={{
                          endAdornment: <Box component="label">ft.</Box>,
                          inputProps: { min: 1 },
                        }}
                        value={attack?.data.damage.distance?.range?.short ?? 20}
                        onChange={(e) =>
                          setAttack({
                            ...attack,
                            data: {
                              ...attack.data,
                              damage: {
                                ...attack.data.damage,
                                distance: {
                                  ...(attack.data.damage.distance ?? {}),
                                  range: {
                                    ...(attack.data.damage.distance?.range ?? {}),
                                    short: parseInt(e.target.value),
                                  },
                                },
                              },
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item laptop={3}>
                      <TextField
                        fullWidth
                        color="secondary"
                        label="Alcance largo"
                        type="number"
                        InputProps={{
                          endAdornment: <Box component="label">ft.</Box>,
                          inputProps: { min: attack?.data.damage.distance?.range?.short ?? 1 },
                        }}
                        value={attack?.data.damage.distance?.range?.long ?? 60}
                        onChange={(e) =>
                          setAttack({
                            ...attack,
                            data: {
                              ...attack.data,
                              damage: {
                                ...attack.data.damage,
                                distance: {
                                  ...(attack.data.damage.distance ?? {}),
                                  range: {
                                    ...(attack.data.damage.distance.range ?? {}),
                                    long: parseInt(e.target.value),
                                  },
                                },
                              },
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item laptop={3} />
                    <Grid item laptop={3} />
                    <Grid item laptop={3}>
                      <TextField
                        fullWidth
                        color="secondary"
                        label="Tipo de daño"
                        value={attack?.data.damage?.distance?.type ?? "Perforante"}
                        onChange={(e) =>
                          setAttack({
                            ...attack,
                            data: {
                              ...attack.data,
                              damage: {
                                ...attack.data.damage,
                                distance: {
                                  ...(attack.data.damage.distance ?? {}),
                                  type: e.target.value,
                                },
                              },
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item laptop={3}>
                      <TextField
                        fullWidth
                        type="number"
                        color="secondary"
                        label="N. de dados"
                        InputProps={{
                          inputProps: { min: 1 },
                        }}
                        value={attack?.data.damage?.distance?.numDie ?? 1}
                        onChange={(e) =>
                          setAttack({
                            ...attack,
                            data: {
                              ...attack.data,
                              damage: {
                                ...attack.data.damage,
                                distance: {
                                  ...(attack.data.damage.distance ?? {}),
                                  numDie: parseInt(e.target.value),
                                },
                              },
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item laptop={3}>
                      <TextField
                        fullWidth
                        type="number"
                        color="secondary"
                        label="T. de dado"
                        InputProps={{
                          inputProps: { min: 4, max: 12, step: 2 },
                        }}
                        value={attack?.data.damage?.distance?.dieSize ?? 4}
                        onChange={(e) =>
                          setAttack({
                            ...attack,
                            data: {
                              ...attack.data,
                              damage: {
                                ...attack.data.damage,
                                distance: {
                                  ...(attack.data.damage.distance ?? {}),
                                  dieSize: parseInt(e.target.value),
                                },
                              },
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item laptop={3} />
                    <Grid item laptop={3}>
                      <TextField
                        fullWidth
                        type="number"
                        color="secondary"
                        label="Bonificador al ataque"
                        value={attack?.data.damage?.distance?.attackBonus ?? 0}
                        onChange={(e) =>
                          setAttack({
                            ...attack,
                            data: {
                              ...attack.data,
                              damage: {
                                ...attack.data.damage,
                                distance: {
                                  ...(attack.data.damage.distance ?? {}),
                                  attackBonus: parseInt(e.target.value),
                                },
                              },
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item laptop={3}>
                      <TextField
                        fullWidth
                        type="number"
                        color="secondary"
                        label="Bonificador al daño"
                        value={attack?.data.damage?.distance?.damageBonus ?? 0}
                        onChange={(e) =>
                          setAttack({
                            ...attack,
                            data: {
                              ...attack.data,
                              damage: {
                                ...attack.data.damage,
                                distance: {
                                  ...(attack.data.damage.distance ?? {}),
                                  damageBonus: parseInt(e.target.value),
                                },
                              },
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Collapse>
          </Grid>

          <Grid item laptop={12}>
            <Collapse in={allowedSections.versatile} {...(allowedSections.versatile ? { timeout: 200 } : {})}>
              <Container header={"Ataque a dos manos"} sx={{ marginInline: 2, marginBlock: 1 }}>
                <Grid item laptop={12} container spacing={2}>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="Tipo de daño"
                      value={attack?.data.damage?.versatile?.type ?? "Cortante"}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              versatile: {
                                ...(attack.data.damage.versatile ?? {}),
                                type: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="N. de dados"
                      type="number"
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      value={attack?.data.damage?.versatile?.numDie ?? 1}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              versatile: {
                                ...(attack.data.damage.versatile ?? {}),
                                numDie: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      type="number"
                      color="secondary"
                      label="T. de dado"
                      InputProps={{
                        inputProps: { min: 4, max: 12, step: 2 },
                      }}
                      value={attack?.data.damage?.versatile?.dieSize ?? 8}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              versatile: {
                                ...(attack.data.damage.versatile ?? {}),
                                dieSize: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3} />
                </Grid>
              </Container>
            </Collapse>
          </Grid>

          <Grid item laptop={12}>
            <Collapse in={allowedSections.extraDamage} {...(allowedSections.extraDamage ? { timeout: 200 } : {})}>
              <Container header={"Daño extra"} sx={{ marginInline: 2, marginBlock: 1 }}>
                <Grid item laptop={12} container spacing={2}>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="Tipo de daño"
                      value={attack?.data.damage?.extraDamage?.type ?? "Contundente"}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              extraDamage: {
                                ...(attack.data.damage.extraDamage ?? {}),
                                type: e.target.value,
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      color="secondary"
                      label="N. de dados"
                      type="number"
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      value={attack?.data.damage?.extraDamage?.numDie ?? 1}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              extraDamage: {
                                ...(attack.data.damage.extraDamage ?? {}),
                                numDie: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3}>
                    <TextField
                      fullWidth
                      type="number"
                      color="secondary"
                      label="T. de dado"
                      InputProps={{
                        inputProps: { min: 4, max: 12, step: 2 },
                      }}
                      value={attack?.data.damage?.extraDamage?.dieSize ?? 4}
                      onChange={(e) =>
                        setAttack({
                          ...attack,
                          data: {
                            ...attack.data,
                            damage: {
                              ...attack.data.damage,
                              extraDamage: {
                                ...(attack.data.damage.extraDamage ?? {}),
                                dieSize: parseInt(e.target.value),
                              },
                            },
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item laptop={3} />
                </Grid>
              </Container>
            </Collapse>
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem style={{ marginRight: "-1px" }} />

        <Grid item laptop={3} sx={{ display: "flex", flexDirection: "column", paddingTop: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                inputProps={{ "aria-label": "¿Con competencia?" }}
                checked={attack?.proficient}
                onChange={() => setAttack({ ...attack, proficient: !attack.proficient })}
              />
            }
            label="¿Con competencia?"
            sx={{ marginLeft: 1 }}
          />
          <Divider sx={{ marginBlock: 2 }} />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                inputProps={{ "aria-label": "Melé" }}
                checked={allowedSections.melee}
                onChange={() => setAllowedSections({ ...allowedSections, melee: !allowedSections.melee })}
              />
            }
            label="Melé"
            sx={{ marginLeft: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                inputProps={{ "aria-label": "Distancia" }}
                checked={allowedSections.distance}
                onChange={() => setAllowedSections({ ...allowedSections, distance: !allowedSections.distance })}
              />
            }
            label="Distancia"
            sx={{ marginLeft: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                inputProps={{ "aria-label": "Versátil" }}
                checked={allowedSections.versatile}
                onChange={() => setAllowedSections({ ...allowedSections, versatile: !allowedSections.versatile })}
              />
            }
            label="Versátil"
            sx={{ marginLeft: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={allowedSections.extraDamage}
                onChange={() => setAllowedSections({ ...allowedSections, extraDamage: !allowedSections.extraDamage })}
                inputProps={{ "aria-label": "Daño extra" }}
              />
            }
            label="Daño extra"
            sx={{ marginLeft: 1 }}
          />
        </Grid>
      </Grid>
      <Divider />
      <ModalFooter
        onClose={onClose}
        onSave={saveAndClose}
        enabled={!!attack.name && !!attack.data.modifier && Object.keys(attack.data.damage).length > 0}
      />
    </FullScreenModal>
  );
}
