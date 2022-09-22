import { Typography } from "@mui/material";
import style from "./ItemSubtitle.style";
const rarityLabels = {
  common: "Común",
  uncommon: "Poco común",
  rare: "Raro",
  "very-rare": "Muy raro",
  legendary: "Legendario",
};

const itemLabels = {
  armor: "Armadura",
  items: "Objeto",
  weapons: "Arma",
  vehicles: "Vehículo",
  magicItems: "Objeto mágico",
  magicWeapons: "Arma mágica",
  magicArmor: "Armadura mágica",
};

const ItemSubtitle = ({ item }) => {
  const { rarity, type } = item;

  return (
    <Typography variant={"subtitle1"} sx={[style.subtitle]}>
      {`${itemLabels[type]}`}
      {rarity && <span style={style.rarities[rarity]}>{`, ${rarityLabels[rarity].toLowerCase()}`}</span>}
    </Typography>
  );
};

export default ItemSubtitle;
