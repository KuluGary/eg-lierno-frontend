import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Container, HTMLEditor } from "components";
import customizable_stats from "helpers/json/customizable_stats.json";
import { useEffect, useState } from "react";

const ProficiencyModal = ({ creatureSkills, option, open, setOpen, handleSave }) => {
  const [changedSkill, setChangedSkill] = useState(null);
  const { stats } = customizable_stats;
  const selectedCharacterSkill = creatureSkills[option?.key];

  useEffect(() => setChangedSkill(null), [open]);

  const handleChange = (e) => {
    const { value } = e.target;

    setChangedSkill({ ...selectedCharacterSkill, modifier: value });
  };

  return (
    <Dialog sx={{ padding: 4 }} fullWidth open={open} maxWidth={"tablet"} onClose={() => setOpen(false)}>
      <DialogTitle>Edita tu habilidad</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item laptop={6}>
            <TextField
              fullWidth
              value={option?.name}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item laptop={6}>
            <FormControl fullWidth>
              <Select
                color="secondary"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={changedSkill?.modifier ?? selectedCharacterSkill?.modifier}
                onChange={handleChange}
              >
                {Object.entries(stats).map(([key, { name }]) => {
                  return <MenuItem value={key}>{name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item laptop={12}>
            <Typography variant="body1">{option?.description}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button>Cancelar</Button>
        <Button color="secondary" disabled={!changedSkill} onClick={() => handleSave(option?.key, changedSkill)}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export function Proficiencies({ creature, setCreature }) {
  const { saves, skills } = customizable_stats;
  const [selectedProficiency, setSelectedProficiency] = useState(null);
  const [proficiencyModalOpen, setProficiencyModalOpen] = useState(false);

  useEffect(() => setProficiencyModalOpen(!!selectedProficiency), [selectedProficiency]);

  const handleCloseModal = () => setSelectedProficiency(null);

  const handleChangeSkill = (key, newSkill) => {
    const { modifier } = newSkill;

    setCreature(`stats.skills.${key}.modifier`, modifier);
    setProficiencyModalOpen(false);
    setSelectedProficiency(null);
  };

  return (
    <Grid container spacing={3}>
      <ProficiencyModal
        creatureSkills={creature?.stats?.skills}
        option={selectedProficiency}
        open={proficiencyModalOpen}
        setOpen={handleCloseModal}
        handleSave={handleChangeSkill}
      />
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Detalles de las proficiencias de personaje
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: "1em" }}>
          Selecciona los datos referentes a las estadísticas de tu personaje.
        </Typography>

        <Container>
          <Typography variant="h6" component="h2">
            Bonificador de competencia
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: "1em" }}>
            Introduce el valor de la bonificación de competencia.
          </Typography>

          <TextField
            fullWidth
            color="secondary"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 20 }, style: { textAlign: "center" } }}
            value={creature.stats.proficiencyBonus}
            onChange={(e) => setCreature("stats.proficiencyBonus", parseInt(e.target.value))}
          />
        </Container>
      </Grid>

      <Grid item laptop={12}>
        <Container>
          <Typography variant="h6" component="h2">
            Tiradas de salvación
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: "1em" }}>
            Introduce las tiradas de salvación con las que eres proficiente.
          </Typography>
          <Autocomplete
            limitTags={2}
            multiple
            id="saves"
            options={Object.values(saves).map(({ name }) => name)}
            value={Object.keys(creature.stats.savingThrows ?? {})
              .filter((key) => creature.stats.savingThrows[key].proficient)
              .map((key) => saves[key].name)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  onDelete={() => {
                    const key = Object.keys(saves).find((key) => saves[key].name === option);

                    setCreature(`stats.savingThrows.${key}.proficient`, false);
                  }}
                />
              ))
            }
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} color="secondary" variant="outlined" placeholder="Tiradas de salvación" />
            )}
            onChange={(_, newData) => {
              newData.forEach((element) => {
                const key = Object.keys(saves).find((key) => saves[key].name === element);

                setCreature(`stats.savingThrows.${key}.proficient`, true);
              });
            }}
          />
        </Container>
      </Grid>
      <Grid item laptop={12}>
        <Container>
          <Typography variant="h6" component="h2">
            Habilidades
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: "1em" }}>
            Introduce las tiradas de habilidades con las que eres proficiente.
          </Typography>
          <Autocomplete
            multiple
            limitTags={2}
            id="skills-prof"
            options={Object.values(skills).map(({ name }) => name)}
            value={Object.keys(creature.stats.skills)
              .filter((key) => creature.stats.skills[key].proficient)
              .map((key) => skills[key].name)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const key = Object.keys(skills).find((key) => skills[key].name === option);
                const stat = saves[creature.stats.skills[key].modifier]?.name;

                return (
                  <Chip
                    key={index}
                    variant="outlined"
                    label={`${option} (${stat})`}
                    {...getTagProps({ index })}
                    onDelete={() => {
                      setCreature(`stats.skills.${key}.proficient`, false);
                    }}
                    onClick={() => {
                      setSelectedProficiency({ ...(skills[key] ?? {}), key });
                    }}
                  />
                );
              })
            }
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} color="secondary" variant="outlined" placeholder="Habilidades con competencia" />
            )}
            onChange={(_, newData) => {
              newData.forEach((element) => {
                const key = Object.keys(skills).find((key) => skills[key].name === element);

                setCreature(`stats.skills.${key}.proficient`, true);
              });
            }}
          />
          <Autocomplete
            multiple
            limitTags={2}
            id="skills-expertise"
            sx={{ marginTop: 3 }}
            options={Object.keys(creature.stats.skills).map((key) => skills[key].name)}
            value={Object.keys(creature.stats.skills)
              .filter((key) => creature.stats.skills[key].proficient && creature.stats.skills[key].expertise)
              .map((key) => skills[key].name)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  onDelete={() => {
                    const key = Object.keys(skills).find((key) => skills[key].name === option);

                    setCreature(`stats.skills.${key}.expertise`, false);
                  }}
                />
              ))
            }
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} color="secondary" variant="outlined" placeholder="Habilidades con pericia" />
            )}
            onChange={(_, newData) => {
              newData.forEach((element) => {
                const key = Object.keys(skills).find((key) => skills[key].name === element);

                setCreature(`stats.skills.${key}.expertise`, true);
              });
            }}
          />
        </Container>
      </Grid>
      <Grid item laptop={12}></Grid>
      <Grid item laptop={12}>
        <HTMLEditor
          multiline
          color="secondary"
          placeholder="Otras proficiencias"
          value={creature.stats?.proficiencies ?? ""}
          onChange={(content) => setCreature("stats.proficiencies", content)}
        />
      </Grid>
    </Grid>
  );
}
