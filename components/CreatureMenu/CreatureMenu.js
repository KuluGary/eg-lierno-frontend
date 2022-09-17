import {
  Code as CodeIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FileCopy as FileCopyIcon,
  FileDownload as FileDownloadIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import download from "downloadjs";
import Api from "services/api";
import Router from "next/router";
import { useState } from "react";

export const CreatureMenu = ({ creature, type, downloadPdf }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEdit = () => {
    Router.push(`/${type}s/add/${creature._id}`);
  };

  const onDelete = () => {
    Api.fetchInternal(`/${type}/${creature._id}`, {
      method: "DELETE",
    }).then(() => Router.back());
  };

  const createDuplicateData = (creature) => {
    const newData = { ...creature };

    delete newData.createdAt;
    delete newData.createdBy;
    delete newData.updatedAt;

    return JSON.stringify(newData);
  };

  const onDuplicate = async () => {
    const duplicateData = JSON.parse(createDuplicateData(creature));

    if (!creature.flavor.group) {
      const tierId = await Api.fetchInternal(`/tier`, {
        method: "POST",
        body: JSON.stringify({ name: creature.name, type }),
      });

      duplicateData["flavor"]["group"] = tierId;

      await Api.fetchInternal(`/${type}s/${creature._id}`, {
        method: "PUT",
        body: JSON.stringify(duplicateData),
      });
    }

    Api.fetchInternal(`/${type}s`, {
      method: "POST",
      body: JSON.stringify(duplicateData),
    }).then((newId) => {
      Router.push(`/${type}s/${newId}`);
    });
  };

  const downloadJson = () => {
    const downloadData = createDuplicateData(creature);

    const bytes = new TextEncoder().encode(downloadData);
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8",
    });

    download(blob, `${creature["name"]}.json`, "application/json");
  };

  const buttons = [
    { Icon: EditIcon, label: "Editar", func: onEdit },
    { Icon: DeleteIcon, label: "Eliminar", func: onDelete },
    { Icon: FileCopyIcon, label: "Duplicar", func: onDuplicate },
    { Icon: FileDownloadIcon, label: "Descargar como PDF", func: downloadPdf },
    { Icon: CodeIcon, label: "Descargar como JSON", func: downloadJson },
  ];

  return (
    <>
      <Menu
        id="character-profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-burron",
        }}
      >
        <MenuList>
          {buttons.map(({ Icon, label, func }) => (
            <MenuItem key={label} onClick={func}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
    </>
  );
};
