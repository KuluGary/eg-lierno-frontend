import { TableBody, TableRow, useTheme } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";

export function DragDropTable({ items, id }) {
  const theme = useTheme();

  return (
    <Droppable direction="vertical" type="CARD" isCombineEnabled={false} droppableId={id}>
      {(droppableProvided, droppableSnapshot) => (
        <TableBody 
          {...droppableProvided.droppableProps} 
          ref={droppableProvided.innerRef} 
          >
          {items?.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}
              sx={{
                background: droppableSnapshot.isDraggingOver
                  ? theme.palette.background.paper
                  : theme.palette.action.hover,
              }}
            >
              {(draggableProvided, draggableSnapshot) => (
                <TableRow
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  sx={{
                    width: "fit-content",
                    transition: theme.transitions.create(["background"], {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.leavingScreen,
                    }),
                    background: draggableSnapshot.isDragging
                      ? theme.palette.action.hover
                      : theme.palette.background.paper,
                  }}
                >
                  {item.content}
                </TableRow>
              )}
            </Draggable>
          ))}
          {droppableProvided.placeholder}
        </TableBody>
      )}
    </Droppable>
  );
}
