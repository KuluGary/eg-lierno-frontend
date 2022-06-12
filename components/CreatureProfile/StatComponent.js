import { Box, Divider, Typography, useTheme, Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material";
import { Shield as ShieldIcon } from "components/icons";
import { getOperatorString, isArrayNotEmpty } from "@lierno/core-helpers";
import { getModifier } from "@lierno/dnd-helpers";
import { FullScreenModal } from "components/Modal";
import { useEffect, useState } from "react";
import { HTMLContainer } from "components/HTMLContainer/HTMLContainer";
import { convert as convertHtmlToString } from "html-to-text";
import customizable_stats from "helpers/json/customizable_stats.json";

export default function StatComponent({ stat, label, bonusList, base }) {
  const { stats, checks } = customizable_stats;
  const [openModal, setOpenModal] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const theme = useTheme();
  const statLabels = {
    strength: "FUE",
    dexterity: "DES",
    constitution: "CON",
    intelligence: "INT",
    wisdom: "SAB",
    charisma: "CAR",
  };

  useEffect(() => {
    if (isArrayNotEmpty(bonusList)) {
      const statList = bonusList.map(
        ({ bonus, descriptions }) => `${getOperatorString(bonus)} ${convertHtmlToString(descriptions)}`
      );

      statList.unshift(`Base: ${base}`);

      setTooltip(<HTMLContainer content={statList.join("<hr />")} />);
    }
  }, [bonusList]);

  return (
    <>
      <FullScreenModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{ display: "flex", alignItems: "flex-end", gap: "1ch", marginBlock: "1rem" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: 0, lineHeight: 0 }}>
            {`${stats[label]?.name} ${stat}`}
          </Typography>
          <Typography variant="subtitle2" component="h3" sx={{ margin: 0, lineHeight: 0 }}>
            {` (${getOperatorString(getModifier(stat))})`}
          </Typography>
        </Box>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1rem", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>Total</TableCell>
                <TableCell sx={{ fontSize: "1rem", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>{stat}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontSize: "1rem", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                  Modificador base
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>{base}</TableCell>
              </TableRow>
              {bonusList.map(({ descriptions, bonus }) => (
                <TableRow>
                  <TableCell sx={{ fontSize: "1rem", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                    {convertHtmlToString(descriptions)}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1rem", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                    {getOperatorString(bonus)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box style={{ marginBlock: "1rem" }}>{stats[label]?.description}</Box>
          <Box style={{ marginBlock: "1rem" }}>
            <HTMLContainer content={checks[label]?.description} />
          </Box>
        </Box>
      </FullScreenModal>
      <Box
        component="div"
        onClick={() => setOpenModal(true)}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          margin: "1em .25em",
          div: {
            transition: theme.transitions.create(["outline"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shortest,
            }),
          },
          g: {
            stroke: theme.palette.divider,
            strokeWidth: 20,
            transition: theme.transitions.create(["stroke"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shortest,
            }),
          },
          "&:hover > div": {
            outline: `2px solid ${theme.palette.secondary[theme.palette.mode]}`,
          },
          "&:hover g": {
            stroke: theme.palette.secondary[theme.palette.mode],
            strokeWidth: 60,
          },
        }}
      >
        <Box
          component="div"
          sx={{ outline: `1px solid ${theme.palette.divider}`, borderRadius: "12px", width: "fit-content" }}
        >
          <Box component="div" sx={{ paddingInline: 3, paddingBlock: 0.5, display: "flex", justifyContent: "center" }}>
            <Typography variant="caption" sx={{ textAlign: "center" }}>
              {statLabels[label]}
            </Typography>
          </Box>
          <Divider />
          <Typography variant="h5" component="p" sx={{ paddingInline: 3, pb: 2, pt: 1, textAlign: "center" }}>
            {getOperatorString(getModifier(stat))}
          </Typography>
        </Box>
        <ShieldIcon
          width={35}
          height={40}
          color={theme.palette.background.paper}
          sx={{ position: "absolute", bottom: "-2rem" }}
        />
        <Typography
          variant="button"
          component="span"
          style={{ textAlign: "center", position: "absolute", bottom: "-1rem" }}
        >
          {stat}
        </Typography>
      </Box>
    </>
  );
}
