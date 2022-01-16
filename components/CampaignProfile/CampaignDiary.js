import { Grid, Box, IconButton, Collapse, Typography } from "@mui/material";
import { Container, HTMLContainer } from "components";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

export function CampaignDiary({ campaign }) {
  const [content, setContent] = useState("");
  const [collapse, setCollapse] = useState(false);

  const renderTree = (node) => {
    const { id, name, description, children } = node;

    return (
      <TreeItem key={id} nodeId={id} label={name} onClick={() => setContent(description)}>
        {Array.isArray(children) ? children.map((childrenNode) => renderTree(childrenNode)) : null}
      </TreeItem>
    );
  };

  const handleCollapse = () => setCollapse((prev) => !prev);

  return (
    <Grid item laptop={12}>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Container
          sx={{
            height: "65vh",
            overflow: "auto",
            width: collapse ? 0 : "calc(100% / 4)",
            marginRight: collapse ? 0 : 1,
            transition: "width ease 0.5s, margin ease 1s",
            border: collapse && "none",
          }}
        >
          <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
            {campaign?.flavor.diary.map((node) => renderTree(node))}
          </TreeView>
        </Container>
        <Container
          sx={{
            height: "65vh",
            overflow: "auto",
            width: collapse ? "100%" : "calc(100% - (100% / 4))",
            marginLeft: collapse ? 0 : 1,
            position: "relative",
            transition: "width ease 0.5s, margin ease 1s",
          }}
        >
          <IconButton
            onClick={handleCollapse}
            sx={{ position: "absolute", top: ".5em", right: ".5em", marginInline: collapse ? 0 : 1 }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <HTMLContainer content={content} />
        </Container>
      </Box>
    </Grid>
  );
}
