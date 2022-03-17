import { Grid, useTheme } from "@mui/material";
import { Container } from "components";
import { useState } from "react";
import { useEffect, useRef } from "react";

function TabletopCanvas() {
  const theme = useTheme();
  const cnv = useRef(null);
  const canvas = cnv?.current;
  const ctx = canvas?.getContext("2d");
  const [numCells, setNumCells] = useState(20);
  const cellSize = Math.floor(canvas?.width / numCells);

  const drawGrid = () => {
    ctx.strokeStyle = theme?.palette.divider;
    ctx.beginPath();

    for (let i = 0; i < numCells + 1; i++) {
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, cellSize * numCells);

      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(cellSize * numCells, i * cellSize);
    }

    ctx.stroke();
  };

  const handleClick = (e) => {
    const clickCoordinates = getClickCoordinates(canvas, e);
    const { x, y } = getCellCoordinates(clickCoordinates.x, clickCoordinates.y);

    ctx.fillStyle = theme?.palette.secondary.main;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  };

  const getCellCoordinates = (x, y) => {
    return {
      x: Math.floor(x / cellSize),
      y: Math.floor(y / cellSize),
    };
  };

  const getClickCoordinates = (element, ev) => {
    const { top, left } = element.getBoundingClientRect();
    const { clientX, clientY } = ev;

    return {
      x: clientX - left,
      y: clientY - top,
    };
  };

  useEffect(() => {
    if (canvas) drawGrid();

    return () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [cnv.current]);

  return (
    <>
      <Grid item laptop={12}>
        <Container sx={{ height: "100%", width: "100%", div: { height: "100%" } }}>
          <canvas ref={cnv} height="400" width="400" onClick={handleClick} />
        </Container>
      </Grid>
    </>
  );
}

export { TabletopCanvas };
