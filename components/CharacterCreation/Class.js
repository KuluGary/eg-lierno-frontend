import { Button, FormControl, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { StringUtil } from "helpers/string-util";
import { HTMLEditor } from "components";
import { useRouter } from "next/router";

export function Class({ creature, setCreature, classes }) {
  const router = useRouter();

  if (router.pathname.includes("npc")) {
    return (
      <Grid container spacing={3}>
        <Grid item laptop={12}>
          <Typography variant="h5" component="h1">
            Detalles de la clase de personaje
          </Typography>
          <Typography variant="subtitle1" sx={{ marginTop: ".25em" }}>
            Selecciona los datos referentes a la clase de tu personaje.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Detalles de la clase de personaje
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: ".25em" }}>
          Selecciona los datos referentes a la clase de tu personaje.
        </Typography>
      </Grid>
      <Grid item laptop={12}>
        <Typography variant="h6" component="h2">
          Clase y nivel
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: ".25em" }}>
          Elige al menos una clase.
        </Typography>
      </Grid>
      {creature.stats.classes?.length > 0 &&
        creature.stats.classes.map(({ className, classLevel, subclassName, subclassDescription, hitDie }, index) => {
          const { data } = classes.find((extendedDataClass) => extendedDataClass.name === className);

          return (
            <Grid key={index} item laptop={12} container spacing={3}>
              <Grid item laptop={7}>
                <FormControl fullWidth>
                  <Select
                    color="secondary"
                    labelId="class-select-label"
                    id="class-select"
                    value={className}
                    onChange={(e) => {
                      let newClasses = [...creature.stats.classes];
                      const newClassData = classes.find(
                        (extendedDataClass) => extendedDataClass.name === e.target.value
                      );

                      newClasses[index] = {
                        ...newClasses[index],
                        classId: newClassData._id,
                        className: e.target.value,
                        hitDie: parseInt(newClassData.data.hitDie),
                      };

                      setCreature("stats.classes", newClasses);
                    }}
                  >
                    {(classes ?? []).map(({ name }, index) => (
                      <MenuItem key={index} value={name}>
                        {StringUtil.generizaClase(name, creature.flavor.traits.pronoun?.toLowerCase())}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item laptop={2}>
                <TextField
                  fullWidth
                  color="secondary"
                  type="number"
                  placeholder="Nivel"
                  InputProps={{ inputProps: { min: 1, max: 20 }, style: { textAlign: "center" } }}
                  value={parseInt(classLevel)}
                  onChange={(e) => {
                    let newClasses = [...creature.stats.classes];
                    newClasses[index] = { ...newClasses[index], classLevel: e.target.value };

                    setCreature("stats.classes", newClasses);
                  }}
                />
              </Grid>
              <Grid item laptop={2}>
                <FormControl fullWidth>
                  <Select
                    color="secondary"
                    labelId="hitDie-select-label"
                    id="hitDie-select"
                    value={hitDie}
                    onChange={(e) => {
                      let newClasses = [...creature.stats.classes];
                      newClasses[index] = { ...newClasses[index], hitDie: e.target.value };

                      setCreature("stats.classes", newClasses);
                    }}
                  >
                    {[4, 6, 8, 10, 12].map((value, index) => (
                      <MenuItem key={index} value={value}>
                        {`1d${value}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item laptop={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconButton
                  onClick={() => {
                    let newArray = [...creature.stats.classes];
                    newArray.splice(index, 1);

                    setCreature("stats.classes", newArray);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
              {classLevel >= data.subclassLevel && (
                <>
                  <Grid item laptop={12}>
                    <TextField
                      fullWidth
                      color="secondary"
                      placeholder="Nombre de subclase"
                      value={subclassName}
                      onChange={(e) => {
                        let newClasses = [...creature.stats.classes];
                        newClasses[index] = { ...newClasses[index], subclassName: e.target.value };

                        setCreature("stats.classes", newClasses);
                      }}
                    />
                  </Grid>
                  <Grid item laptop={12}>
                    <HTMLEditor
                      fullWidth
                      multiline
                      color="secondary"
                      placeholder="Descripción de subclase"
                      value={subclassDescription}
                      onChange={(content) => {
                        let newClasses = [...creature.stats.classes];
                        newClasses[index] = { ...newClasses[index], subclassDescription: content };

                        setCreature("stats.classes", newClasses);
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          );
        })}
      <Grid item laptop={12}>
        <Button
          onClick={() => {
            const newClasses = [
              ...creature.stats.classes,
              {
                className: classes[0]?.name,
                classLevel: 1,
                hitDie: classes[0]?.data.hitDie,
                classId: classes[0]?._id,
              },
            ];

            setCreature("stats.classes", newClasses);
          }}
        >
          <AddIcon sx={{ marginRight: "1em" }} />
          Añadir niveles en otra clase
        </Button>
      </Grid>
    </Grid>
  );
}
