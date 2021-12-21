import { Grid, Typography, Autocomplete, TextField, Chip } from "@mui/material";
import { HTMLEditor } from "components";
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
          options={Object.keys(creature.stats.savingThrows).map((key) => saves[key].name)}
          value={Object.keys(creature.stats.savingThrows)
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
      </Grid>

      <Grid item laptop={12}>
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
          options={Object.keys(creature.stats.skills).map((key) => skills[key].name)}
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
      </Grid>
      <Grid item laptop={12}>
        <Autocomplete
          multiple
          limitTags={2}
          id="skills-expertise"
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
      </Grid>
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
