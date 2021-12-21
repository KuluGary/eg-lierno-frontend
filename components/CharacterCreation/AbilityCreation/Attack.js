import { useEffect, useState } from "react";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Typography,
} from "@mui/material";
import { FullScreenModal } from "components/Modal";
import { ModalFooter, ModalHeader } from ".";
import { Container } from "components";
import { statLabels } from "helpers/creature-calculations";

const defaultFormData = {
  melee: {
    range: 5,
    type: "Cortante",
    numDie: 1,
    dieSize: 6
  },
  distance: {
    range: {
      short: 20,
      long: 60,
    },
    type: "Perforante",
    numDie: 1,
    dieSize: 4
  },
  versatile: {
    type: "Cortante",
    numDie: 1,
    dieSize: 8
  },
  extraDamage: {
    type: "Cortante",
    numDie: 1,
    dieSize: 6
  }
}

export function Attack({ open, onClose, section, selectedIndex, creature, onSave }) {
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
  }, [section, selectedIndex]);

  useEffect(() => {
    for (const section in allowedSections) {

      if (allowedSections[section] === false && section in attack.data.damage) {
        const newData = {...attack}
        delete newData.data.damage[section];
        
        setAttack(newData);
      } else if (allowedSections[section] === true && section in attack.data.damage !== true) {
        const newData = {...attack}
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
      containerStyles={{ p: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      <Grid container spacing={1}>
        <ModalHeader section={section} />
        <Grid item laptop={9} container spacing={0}>
          <Grid item laptop={9}>
            <Box sx={{ m: 2 }}>
              <TextField
                fullWidth
                color="secondary"
                placeholder="Nombre del ataque"
                value={attack.name}
                onChange={(e) => setAttack({ ...attack, name: e.target.value })}
              />
            </Box>
          </Grid>
          <Grid item laptop={3}>
            <Box sx={{ m: 2 }}>
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
            </Box>
          </Grid>
          <Collapse in={allowedSections.melee} {...(allowedSections.melee ? { timeout: 200 } : {})}>
            <Box>
              <Container sx={{ marginInline: 2, marginBlock: 1 }}>
                <Box sx={{ p: 2 }}>
                  <Grid item laptop={12} container spacing={2}>
                    <Grid item laptop={12}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Ataque a melé
                      </Typography>
                    </Grid>
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
                        // InputLabelProps={{ shrink: true }}
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
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Collapse>
          <Collapse in={allowedSections.distance} {...(allowedSections.distance ? { timeout: 200 } : {})}>
            <Container sx={{ marginInline: 2, marginBlock: 1 }}>
              <Box sx={{ p: 2 }}>
                <Grid item laptop={12} container spacing={2}>
                  <Grid item laptop={12}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Ataque a distancia
                    </Typography>
                  </Grid>
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
                </Grid>
              </Box>
            </Container>
          </Collapse>
          <Collapse in={allowedSections.versatile} {...(allowedSections.versatile ? { timeout: 200 } : {})}>
            <Container sx={{ marginInline: 2, marginBlock: 1 }}>
              <Box sx={{ p: 2 }}>
                <Grid item laptop={12} container spacing={2}>
                  <Grid item laptop={12}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Ataque a dos manos
                    </Typography>
                  </Grid>
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
              </Box>
            </Container>
          </Collapse>
          <Collapse in={allowedSections.extraDamage} {...(allowedSections.extraDamage ? { timeout: 200 } : {})}>
            <Container sx={{ marginInline: 2, marginBlock: 1 }}>
              <Box sx={{ p: 2 }}>
                <Grid item laptop={12} container spacing={2}>
                  <Grid item laptop={12}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Daño extra
                    </Typography>
                  </Grid>
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
              </Box>
            </Container>
          </Collapse>
        </Grid>
        <Grid item laptop={3} sx={{ display: "flex", flexDirection: "column" }}>
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
          />
        </Grid>
      </Grid>
      <ModalFooter
        onClose={onClose}
        onSave={saveAndClose}
        enabled={!!attack.name && !!attack.data.modifier && Object.keys(attack.data.damage).length > 0}
      />
    </FullScreenModal>
  );
}
