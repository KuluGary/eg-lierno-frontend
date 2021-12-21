import {
  Grid,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";
import { Help as HelpOutlineIcon, AddPhotoAlternate as AddPhotoAlternateIcon } from "@mui/icons-material";
import { useState } from "react";
import { StringUtil } from "helpers/string-util";
import { HTMLEditor } from "components";
import { useRouter } from "next/router";
import ImageUploader from "components/ImageUploader/ImageUploader";

export function Details({ creature, setCreature }) {
  const router = useRouter();
  const theme = useTheme();
  const alignments = [
    {
      label: StringUtil.generiza("Legal bueno", "Legal buena", "Legal buene", creature?.flavor?.traits?.pronoun),
      description: "Se puede contar con que estas criaturas hagan lo correcto tal y como espera la sociedad.",
    },
    {
      label: StringUtil.generiza("Neutral bueno", "Neutral buena", "Neutral buene", creature?.flavor?.traits?.pronoun),
      description: "Son gente que da lo mejor de sí misma para ayudar a los demás de acuerdo a sus necesidades.",
    },
    {
      label: StringUtil.generiza("Caótico bueno", "Caótica buena", "Caótique buene", creature?.flavor?.traits?.pronoun),
      description:
        "Estas criaturas actúan como les dicta su conciencia, con pocos miramientos a lo que esperan los demás.",
    },
    {
      label: "Legal neutral",
      description: "Estos individuos actúan de acuerdo a la ley, la tradición o los códigos personales.",
    },
    {
      label: "Neutral",
      description:
        "Este alineamiento es el de los que prefieren evitar las cuestiones morales y no se ponen de ningún lado, sino que hacen lo que les parece mejor en cada momento. ",
    },
    {
      label: StringUtil.generiza(
        "Caótico neutral",
        "Caótica neutral",
        "Caótique neutral",
        creature?.flavor?.traits?.pronoun
      ),
      description: "Estas criaturas siguen sus caprichos, poniendo su libertad personal por encima de todo lo demás.",
    },
    {
      label: StringUtil.generiza("Legal malo", "Legal mala", "Legal male", creature?.flavor?.traits?.pronoun),
      description:
        "Son criaturas que cogen lo que quieren metódicamente, dentro de un código de tradición, lealtad y orden.",
    },
    {
      label: StringUtil.generiza("Neutral malo", "Neutral mala", "Neutal male", creature?.flavor?.traits?.pronoun),
      description:
        "Este alineamiento es el de los que hacen lo que sea para salirse con la suya, sin compasión ni escrúpulos.",
    },
    {
      label: StringUtil.generiza("Caótico malo", "Caótica mala", "Caótique male", creature?.flavor?.traits?.pronoun),
      description:
        "Estas criaturas actúan con una violencia arbitraria, estimulada por su avaricia, su odio o su sed de sangre.",
    },
  ];
  const pronouns = ["El", "La", "Le"];
  const [selectedAlignment] = useState(creature?.flavor?.alignment ?? alignments[0].label);
  const isCharacter = router.pathname.includes("characters");
  const sizes = [
    StringUtil.generiza("Diminuto", "Diminuta", "Diminute", creature.flavor.traits.pronoun),
    StringUtil.generiza("Pequeño", "Pequeña", "Pequeñe", creature.flavor.traits.pronoun),
    StringUtil.generiza("Mediano", "Mediana", "Mediane", creature.flavor.traits.pronoun),
    "Grande",
    "Enorme",
    StringUtil.generiza("Gigantesco", "Gigantesca", "Gigantesque", creature.flavor.traits.pronoun),
  ];
  const [openUploader, setOpenUploader] = useState();

  return (
    <Grid container spacing={3}>
      <ImageUploader
        open={openUploader}
        setOpen={setOpenUploader}
        setImage={(content) =>
          Object.entries(content).forEach(([key, value]) => setCreature(`flavor.portrait.${key}`, value))
        }        
      />
      <Grid item laptop={12}>
        <Typography variant="h5" component="h1">
          Detalles básicos del personaje
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "1em" }}>
          Por favor, introduce los detalles básicos referentes a tu personaje.
        </Typography>
      </Grid>
      <Grid item laptop={8}>
        <TextField
          color="secondary"
          fullWidth
          placeholder="Nombre de personaje"
          value={creature?.name}
          onChange={(e) => setCreature("name", e.target.value)}
        />
      </Grid>
      <Grid item laptop={4}>
        <FormControl fullWidth>
          <Select
            color="secondary"
            labelId="pronoun-select-label"
            id="pronoun-select"
            value={creature.flavor?.traits?.pronoun || pronouns[0]}
            onChange={(e) => setCreature("flavor.traits.pronoun", e.target.value)}
          >
            {pronouns.map((pronoun, index) => (
              <MenuItem key={index} value={pronoun}>
                {pronoun}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item laptop={3}>
        {!creature?.flavor?.portrait?.original ? (
          <Box
            component="div"
            sx={{
              width: "100%",
              height: "100%",
              border: `1px solid ${theme.palette.action.disabled}`,
              borderRadius: "12px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: theme.transitions.create(["border"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shortest,
              }),
              "& > *": {
                color: theme.palette.action.disabled,
                transition: theme.transitions.create(["color"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.shortest,
                }),
              },
              "&:hover": {
                border: `2px solid ${theme.palette.secondary.main}`,
                "& > *": {
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <HelpOutlineIcon fontSize="large" />
          </Box>
        ) : (
          <Box
            component="div"
            sx={{
              height: "100%",
              width: "100%",
              backgroundImage: `url(${creature?.flavor?.portrait?.original})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionX: "center",
              borderRadius: "12px",
            }}
          ></Box>
        )}
      </Grid>
      <Grid item container laptop={9} spacing={3}>
        <Grid item laptop={6}>
          <TextField
            color="secondary"
            fullWidth
            placeholder="Género"
            value={creature?.flavor?.traits?.gender}
            onChange={(e) => setCreature("flavor.traits.gender", e.target.value)}
          />
        </Grid>
        <Grid item laptop={6}>
          {isCharacter ? (
            <TextField
              fullWidth
              color="secondary"
              placeholder="Edad"
              value={creature?.flavor?.traits?.age}
              onChange={(e) => setCreature("flavor.traits.age", e.target.value)}
            />
          ) : (
            <TextField
              fullWidth
              color="secondary"
              placeholder="Clase"
              value={creature?.flavor?.class}
              onChange={(e) => setCreature("flavor.class", e.target.value)}
            />
          )}
        </Grid>
        <Grid item laptop={6}>
          {isCharacter ? (
            <TextField
              fullWidth
              color="secondary"
              placeholder="Altura"
              value={creature?.flavor?.traits?.height}
              onChange={(e) => setCreature("flavor.traits.height", e.target.value)}
            />
          ) : (
            <TextField
              fullWidth
              color="secondary"
              placeholder="Raza"
              value={creature?.stats?.race?.name}
              onChange={(e) => setCreature("flavor.race.name", e.target.value)}
            />
          )}
        </Grid>
        <Grid item laptop={6}>
          {isCharacter ? (
            <TextField
              color="secondary"
              fullWidth
              placeholder="Peso"
              value={creature?.flavor?.traits?.weight}
              onChange={(e) => setCreature("flavor.traits.weight", e.target.value)}
            />
          ) : (
            <FormControl fullWidth>
              <Select
                color="secondary"
                labelId="pronoun-select-label"
                id="pronoun-select"
                value={creature.stats?.race?.size || sizes[3]}
                onChange={(e) => setCreature("flavor.traits.pronoun", e.target.value)}
              >
                {sizes.map((size, index) => (
                  <MenuItem key={index} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item laptop={12}>
          <FormControl fullWidth>
            <Select
              color="secondary"
              value={creature.flavor.alignment}
              onChange={(e) => setCreature("flavor.alignment", e.target.value)}
              labelId="alignment-selection-label"
              id="alignment-selection"
              placeholder="Alineamiento"
            >
              {alignments.map(({ label }, index) => (
                <MenuItem key={index} value={label}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {alignments.find((alignment) => alignment.label === selectedAlignment)?.description}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item laptop={12}>
          <TextField
            color="secondary"
            fullWidth
            onClick={() => console.log("click")}
            placeholder="Añadir una imagen..."
            value={creature?.flavor.portrait?.original}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={() => setOpenUploader(true)}>
                  <AddPhotoAlternateIcon color="action" />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid item laptop={12}>
        <HTMLEditor
          multiline
          color="secondary"
          fullWidth
          label="Personalidad"
          value={creature?.flavor?.personality ?? ""}
          onChange={(content) => setCreature("flavor.personality", content)}
        />
      </Grid>
      <Grid item laptop={12}>
        <HTMLEditor
          multiline
          color="secondary"
          fullWidth
          label="Apariencia"
          value={creature?.flavor?.appearance ?? ""}
          onChange={(content) => setCreature("flavor.appearance", content)}
        />
      </Grid>
      <Grid item laptop={12}>
        <HTMLEditor
          multiline
          color="secondary"
          label="Historia"
          value={creature?.flavor?.backstory ?? ""}
          onChange={(content) => {
            setCreature("flavor.backstory", content);
          }}
        />
      </Grid>
    </Grid>
  );
}
