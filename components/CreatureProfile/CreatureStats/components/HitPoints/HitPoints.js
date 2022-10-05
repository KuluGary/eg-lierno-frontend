import { Box, Divider, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { HeartMinus } from "components/icons/HeartMinus.js";
import { HeartPlus } from "components/icons/HeartPlus.js";
import { HeartTemp } from "components/icons/HeartTemp.js";
import { FullScreenModal } from "components/Modal/FullScreenModal.js";
import { useState } from "react";
import style from "./HitPoints.style.js";

const HitPoints = ({ children, hitPoints, modifyHitPoints }) => {
  const [healAmount, setHealAmount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (key) => {
    switch (key) {
      case "add":
        const healthToAdd = hitPoints.current + healAmount;
        modifyHitPoints("current", healthToAdd > hitPoints.max ? hitPoints.max : healthToAdd);
        break;
      case "remove":
        let healthToRemove = healAmount;

        if (hitPoints.temp && hitPoints.temp > 0) {
          if (healthToRemove <= hitPoints.temp) {
            modifyHitPoints("temp", hitPoints.temp - healthToRemove);
          } else {
            healthToRemove = healthToRemove - hitPoints.temp;
            const newTotalHealth = hitPoints.current - healthToRemove;
            
            modifyHitPoints("current", newTotalHealth < 0 ? 0 : newTotalHealth);
            modifyHitPoints("temp", 0);
          }
        } else {
          const newTotalHealth = hitPoints.current - healthToRemove;

          modifyHitPoints("current", newTotalHealth < 0 ? 0 : newTotalHealth);
        }

        break;
      case "temp":
        modifyHitPoints("temp", healAmount);
        break;
      default:
        break;
    }

    setHealAmount(0);
    // setOpenModal(false);
  };

  return (
    <Box>
      <Box onClick={() => setOpenModal(true)} sx={style.childrenContainer}>
        {children}
      </Box>
      <FullScreenModal containerStyles={style.modalContainer} open={openModal} onClose={() => setOpenModal(false)}>
        <Typography variant="h6">Modificar puntos de vida</Typography>
        <Box>Recupera o elimina puntos de vida o puntos de vida temporales.</Box>
        <Box sx={style.modalContentContainer}>
          <Box sx={[style.sectionContainer, style.dataContainer, style.damageCalcContainer]}>
            <Box sx={[style.dataContainerSection, { justifyContent: "center" }]}>
              <Box>
                <Typography variant="caption">MODIFICAR</Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={[style.dataContainerSection, style.dataContainerBody]}>
              <Tooltip title="Puntos de vida a quitar o añadir">
                <TextField
                  type="number"
                  value={healAmount}
                  onChange={(e) => setHealAmount(parseInt(e.target.value))}
                  inputProps={{ min: 0, max: 999, style: { textAlign: "center" } }}
                  size="small"
                  variant="outlined"
                  sx={{
                    marginInline: 1,
                  }}
                />
              </Tooltip>
            </Box>
            <Divider />
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Tooltip title="Restar puntos de vida">
                  <IconButton onClick={() => handleSubmit("remove")} size="small" sx={{ width: "fit-content" }}>
                    <HeartMinus size={22} sx={{ margin: 0 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Recuperar puntos de vida">
                  <IconButton onClick={() => handleSubmit("add")} size="small" sx={{ width: "fit-content" }}>
                    <HeartPlus size={22} sx={{ margin: 0 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Añadir puntos de vida temporales">
                  <IconButton onClick={() => handleSubmit("temp")} size="small" sx={{ width: "fit-content" }}>
                    <HeartTemp size={22} sx={{ margin: 0 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box sx={[style.sectionContainer, style.dataContainer]}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption">PUNTOS DE VIDA</Typography>
            </Box>
            <Divider />
            <Box sx={[style.dataContainerSection, style.dataContainerBody]}>
              <Typography variant="h5">{hitPoints?.current ?? 0}</Typography>
              <Typography variant="h5">{hitPoints?.max ?? 0}</Typography>
              <Typography variant="h5">{hitPoints?.temp ?? "--"}</Typography>
            </Box>
            <Divider />
            <Box sx={style.dataContainerSection}>
              <Box>
                <Typography variant="caption">ACTUAL</Typography>
              </Box>
              <Box>
                <Typography variant="caption">TOTAL</Typography>
              </Box>
              <Box>
                <Typography variant="caption">TEMP</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </FullScreenModal>
    </Box>
  );
};

export default HitPoints;
