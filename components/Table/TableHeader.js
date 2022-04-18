import {
  Add as AddIcon,
  FilterList as FilterListIcon,
  GridView as GridViewIcon,
  Search as SearchIcon,
  UploadFile as UploadFileIcon,
} from "@mui/icons-material";
import { Box, Collapse, IconButton, InputAdornment, TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import { Container } from "..";

const TableHeader = ({ onSearch, querySearch, Filters, onAdd, onUpload, setTableView }) => {
  const theme = useTheme();
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Container noPadding>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box component="span">
          {!!onSearch && (
            <TextField
              size="small"
              placeholder={"Buscar por nombre..."}
              sx={{ m: "1em" }}
              value={querySearch}
              onChange={onSearch}
              color="secondary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>
        <Box sx={{ m: "1em", gap: 1, display: "flex" }}>
          {!!Filters && (
            <IconButton
              color="primary"
              onClick={() => setOpenFilter(!openFilter)}
              sx={{
                border: `1px solid ${theme.palette.primary.main}80`,
                borderRadius: "8px",
                padding: ".25em",
                transition: theme.transitions.create(["border"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                "&:hover": {
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <FilterListIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            color="secondary"
            onClick={() => setTableView((tv) => !tv)}
            sx={{
              border: `1px solid ${theme.palette.secondary.main}80`,
              borderRadius: "8px",
              padding: ".25em",
              transition: theme.transitions.create(["border"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              "&:hover": {
                border: `1px solid ${theme.palette.secondary.main}`,
              },
            }}
          >
            <GridViewIcon fontSize="small" />
          </IconButton>
          {!!onUpload && (
            <IconButton
              color="secondary"
              onClick={onUpload}
              sx={{
                border: `1px solid ${theme.palette.secondary.main}80`,
                borderRadius: "8px",
                padding: ".25em",
                transition: theme.transitions.create(["border"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                "&:hover": {
                  border: `1px solid ${theme.palette.secondary.main}`,
                },
              }}
            >
              <UploadFileIcon fontSize="small" />
            </IconButton>
          )}
          {!!onAdd && (
            <IconButton
              color="secondary"
              onClick={onAdd}
              sx={{
                border: `1px solid ${theme.palette.secondary.main}80`,
                borderRadius: "8px",
                padding: ".25em",
                transition: theme.transitions.create(["border"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                "&:hover": {
                  border: `1px solid ${theme.palette.secondary.main}`,
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
      {!!Filters && (
        <Collapse in={openFilter}>
          <Box
            sx={{
              m: "1em",
              opacity: 0,
              transition: theme.transitions.create(["opacity"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              transitionDelay: "250ms",
              ...(openFilter && { opacity: 1 }),
            }}
          >
            {Filters}
          </Box>
        </Collapse>
      )}
    </Container>
  );
};

export { TableHeader };
