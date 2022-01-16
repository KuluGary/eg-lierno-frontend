import {
  Grid,
  Typography,
  InputBase,
  Divider,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Container, HTMLEditor } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { CreatureCalculations } from "helpers/creature-calculations";
import { useRouter } from "next/router";

const statLabels = {
  strength: "FUE",
  dexterity: "DES",
  constitution: "CON",
  intelligence: "INT",
  wisdom: "SAB",
  charisma: "CAR",
};

export function Stats({ creature, setCreature }) {
  const router = useRouter();
  const isCharacter = router.pathname.includes("characters");

  return (
    <Grid container spacing={3}>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Detalles de las estadísticas de personaje
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "1em" }}>
          Selecciona los datos referentes a las estadísticas de tu personaje.
        </Typography>
      </Grid>
      <Grid item laptop={isCharacter ? 8 : 6}>
        <Container>
          <Grid item laptop={12} container spacing={3}>
            <Grid
              item
              laptop={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="button">VELOCIDAD</Typography>
              <Typography variant="overline">A PIE</Typography>
              <Container>
                <InputBase
                  type="number"
                  inputProps={{ step: 5, style: { textAlign: "center" } }}
                  value={creature?.stats.speed.land ?? creature?.stats.speed}
                  onChange={(e) => setCreature("stats.speed.land", parseInt(e.target.value))}
                />
              </Container>
            </Grid>
            <Grid
              item
              laptop={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="button">VELOCIDAD</Typography>
              <Typography variant="overline">NADANDO</Typography>
              <Container>
                <InputBase
                  type="number"
                  inputProps={{ step: 5, style: { textAlign: "center" } }}
                  value={creature?.stats.speed.swim ?? 0}
                  onChange={(e) => setCreature("stats.speed.swim", parseInt(e.target.value))}
                />
              </Container>
            </Grid>
            <Grid
              item
              laptop={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="button">VELOCIDAD</Typography>
              <Typography variant="overline">VOLANDO</Typography>
              <Container>
                <InputBase
                  type="number"
                  inputProps={{ step: 5, style: { textAlign: "center" } }}
                  value={creature?.stats.speed.air ?? 0}
                  onChange={(e) => setCreature("stats.speed.air", parseInt(e.target.value))}
                />
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {!isCharacter && <Grid item laptop={isCharacter ? 4 : 3}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="button">CLASE</Typography>
            <Typography variant="overline">DE DESAFÍO</Typography>
            <Container>
              <InputBase
                type="number"
                value={creature.stats?.challengeRating}
                inputProps={{ min: 0, max: 50, step: 0.25, style: { textAlign: "center" } }}
                onChange={(e) => {
                  let newValue = parseFloat(e.target.value);
                  let oldValue = creature.stats.challengeRating;

                  if (newValue > 1) {
                    if (newValue > oldValue) {
                      newValue = Math.ceil(newValue);
                    } else {
                      newValue = Math.floor(newValue);
                    }
                  } else {
                    if (newValue === 0.75) {
                      if (newValue > oldValue) {
                        newValue = 1;
                      } else {
                        newValue = 0.5;
                      }
                    }
                  }

                  setCreature("stats.challengeRating", newValue);
                }}
              />
            </Container>
          </Box>
        </Container>
      </Grid>}
      <Grid item laptop={isCharacter ? 4 : 3}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="button">CLASE</Typography>
            <Typography variant="overline">DE ARMADURA</Typography>
            <Container>
              <InputBase
                type="number"
                inputProps={{ min: 5, style: { textAlign: "center" } }}
                value={creature?.stats.armorClass}
                onChange={(e) => setCreature("stats.armorClass", parseInt(e.target.value))}
              />
            </Container>
          </Box>
        </Container>
      </Grid>
      <Grid item laptop={12}>
        <Container>
          <Grid container spacing={3}>
            {Object.keys(creature.stats?.abilityScores)?.map((key, index) => {
              const label = statLabels[key];
              const value = creature.stats.abilityScores[key];

              return (
                <Grid
                  item
                  laptop={2}
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="button">{label}</Typography>
                  <Typography variant="overline">BASE</Typography>
                  <Container>
                    <InputBase
                      value={value}
                      type="number"
                      inputProps={{ min: 0, style: { textAlign: "center" } }}
                      onChange={(e) => setCreature("stats.abilityScores." + key, parseInt(e.target.value))}
                    />
                  </Container>
                </Grid>
              );
            })}
            <Grid item laptop={12}>
              <Divider sx={{ mb: "1em" }} />
              {creature?.stats.abilityScoreBonus?.map(({ modifier, bonus, description }, index) => (
                <Grid key={index} item laptop={12} container spacing={3}>
                  <Grid item laptop={8}>
                    <FormControl fullWidth>
                      <Select
                        color="secondary"
                        labelId="hitDie-select-label"
                        id="hitDie-select"
                        value={modifier}
                        onChange={(e) => {
                          const newBonuses = [...creature?.stats.abilityScoreBonus];
                          newBonuses[index].modifier = e.target.value;

                          setCreature("stats.abilityScoreBonus", newBonuses);
                        }}
                      >
                        {Object.keys(statLabels).map((key, index) => (
                          <MenuItem key={index} value={key}>
                            {statLabels[key]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item laptop={4}>
                    <TextField
                      fullWidth
                      color="secondary"
                      type="number"
                      placeholder="Bonificador"
                      InputProps={{ inputProps: { min: 1, max: 20 }, style: { textAlign: "center" } }}
                      value={bonus}
                      onChange={(e) => {
                        const newBonuses = [...creature?.stats.abilityScoreBonus];
                        newBonuses[index].bonus = e.target.value;

                        setCreature("stats.abilityScoreBonus", newBonuses);
                      }}
                    />
                  </Grid>
                  <Grid item laptop={12}>
                    <HTMLEditor
                      fullWidth
                      color="secondary"
                      placeholder="Causa del modificador"
                      value={description ?? ""}
                      onChange={(e) => {
                        const newBonuses = [...creature?.stats.abilityScoreBonus];
                        newBonuses[index].description = e.target.value;

                        setCreature("stats.abilityScoreBonus", newBonuses);
                      }}
                    />
                  </Grid>
                  <Grid item laptop={12}>
                    <Divider sx={{ mb: "1em" }} />
                  </Grid>
                </Grid>
              ))}
              <Button
                onClick={() => {
                  const newBonuses = [
                    ...(creature?.stats?.abilityScoreBonus ?? []),
                    {
                      modifier: "strength",
                      bonus: 1,
                      descriptions: "",
                    },
                  ];

                  setCreature("stats.abilityScoreBonus", newBonuses);
                }}
              >
                <AddIcon sx={{ marginRight: "1em" }} />
                Añadir bonificador a las características
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {!isCharacter && (
        <Grid item laptop={4}>
          <Container sx={{ height: "100%" }}>
            <Grid item laptop={12} container spacing={0}>
              <Grid item laptop={12} sx={{ textAlign: "center" }}>
                <Typography variant="button">DADOS DE GOLPE</Typography>
              </Grid>
              <Grid
                item
                laptop={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="overline">NÚMERO</Typography>
                <Container>
                  <InputBase
                    type="number"
                    inputProps={{ min: 1, max: 999, step: 1, style: { textAlign: "center" } }}
                    value={creature?.stats.hitDie.num ?? 0}
                    onChange={(e) => setCreature("stats.hitDie.num", parseInt(e.target.value))}
                  />
                </Container>
              </Grid>
              <Grid
                item
                laptop={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="overline">TAMAÑO</Typography>
                <Container>
                  <InputBase
                    type="number"
                    inputProps={{ min: 4, max: 12, step: 2, style: { textAlign: "center" } }}
                    value={creature?.stats.hitDie.size ?? 0}
                    onChange={(e) => setCreature("stats.hitDie.size", parseInt(e.target.value))}
                  />
                </Container>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      )}
      <Grid item laptop={isCharacter ? 12 : 8}>
        <Container>
          <Grid item laptop={12} container spacing={3}>
            <Grid
              item
              laptop={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="overline">PUNTOS DE VIDA</Typography>
              <Typography variant="button">MÁXIMOS</Typography>
              <Container>
                <InputBase
                  type="number"
                  inputProps={{ min: 1, max: 999, style: { textAlign: "center" } }}
                  value={creature?.stats.hitPoints.max ?? 0}
                  onChange={(e) => setCreature("stats.hitPoints.max", parseInt(e.target.value))}
                />
              </Container>
            </Grid>
            <Grid
              item
              laptop={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="overline">PUNTOS DE VIDA</Typography>
              <Typography variant="button">ACTUALES</Typography>
              <Container>
                <InputBase
                  type="number"
                  inputProps={{ min: 1, max: creature?.stats.hitPoints.max ?? 999, style: { textAlign: "center" } }}
                  value={creature?.stats.hitPoints.current ?? creature?.stats.hitPoints.max ?? 0}
                  onChange={(e) => setCreature("stats.hitPoints.current", parseInt(e.target.value))}
                />
              </Container>
            </Grid>
            <Grid
              item
              laptop={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="overline">PUNTOS DE VIDA</Typography>
              <Typography variant="button">TEMPORALES</Typography>
              <Container>
                <InputBase
                  type="number"
                  inputProps={{ min: 1, max: 999, style: { textAlign: "center" } }}
                  value={creature?.stats.hitPoints.temporal ?? 0}
                  onChange={(e) => setCreature("stats.hitPoints.temporal", parseInt(e.target.value))}
                />
              </Container>
            </Grid>
            <Grid
              item
              laptop={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="button">CALCULAR</Typography>
              <Typography variant="overline">PUNTOS DE VIDA</Typography>
              <Container>
                <Button
                  onClick={() => {
                    const conModifier = CreatureCalculations.modifier(creature?.stats.abilityScores.constitution);
                    const modifiers = [];

                    if (isCharacter) {
                      creature.stats.classes.forEach(({ classLevel, hitDie }) => {
                        for (let index = 0; index < classLevel; index++) {
                          if (index === 0) {
                            modifiers.push(hitDie + conModifier);
                          } else {
                            modifiers.push(hitDie / 2 + 1 + conModifier);
                          }
                        }
                      });
                    } else {
                      const { num, size } = creature?.stats.hitDie;

                      for (let index = 0; index < num; index++) {
                        if (index === 0) {
                          modifiers.push(size + conModifier);
                        } else {
                          modifiers.push(size / 2 + 1 + conModifier);
                        }
                      }
                    }
                    const newMaxHitPoints = modifiers.reduce((a, b) => a + b);

                    setCreature("stats.hitPoints.max", newMaxHitPoints);
                  }}
                >
                  <FontAwesomeIcon size="lg" icon={faDice} style={{ marginRight: "1em" }} />
                  {isCharacter
                    ? creature?.stats.classes?.map(({ classLevel, hitDie }) => `${classLevel}d${hitDie}`).join(" + ")
                    : `${creature?.stats.hitDie.num}d${creature?.stats.hitDie.size}`}
                </Button>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
