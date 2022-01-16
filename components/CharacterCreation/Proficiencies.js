import { Grid, Typography, Autocomplete, TextField, Chip } from "@mui/material";
import { HTMLEditor, Container } from "components";
import customizable_stats from "helpers/json/customizable_stats.json";

export function Proficiencies({ creature, setCreature }) {
  const { saves, skills } = customizable_stats;

  return (
    <Grid container spacing={3}>
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
            value={Object.keys((creature.stats.savingThrows) ?? {})
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
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  onDelete={() => {
                    const key = Object.keys(skills).find((key) => skills[key].name === option);

                    setCreature(`stats.skills.${key}.proficient`, false);
                  }}
                />
              ))
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
