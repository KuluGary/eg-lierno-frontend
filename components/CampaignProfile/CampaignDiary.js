import { Grid, Box, IconButton, Collapse, Typography, styled } from "@mui/material";
import { Container, HTMLContainer } from "components";
import { TreeView, TreeItem } from "@mui/lab";
import { treeItemClasses } from "@mui/lab/TreeItem";
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  ArrowRight,
  ArrowDropDown,
} from "@mui/icons-material";
import { useState } from "react";

export function CampaignDiary({ campaign }) {
  const [content, setContent] = useState("");
  const [collapse, setCollapse] = useState(false);

  const renderTree = (node) => {
    const { id, name, description, children } = node;

    return (
      <StyledTreeItem
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        key={id}
        nodeId={id}
        label={name}
        onClick={() => setContent(description)}
      >
        {Array.isArray(children) ? children.map((childrenNode) => renderTree(childrenNode)) : null}
      </StyledTreeItem>
    );
  };

  const handleCollapse = () => setCollapse((prev) => !prev);

  return (
    <Grid item laptop={12}>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Container
          noPadding
          sx={{
            height: "65vh",
            overflow: "auto",
            width: collapse ? 0 : "calc(100% / 4)",
            marginRight: collapse ? 0 : 1,
            transition: "width ease 0.5s, margin ease 1s",
            border: collapse && "none",
            paddingBlock: 2,
          }}
        >
          <TreeView
            aria-label="gmail"
            defaultExpanded={["3"]}
            defaultCollapseIcon={<ArrowDropDown />}
            defaultExpandIcon={<ArrowRight />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          >
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
          <IconButton onClick={handleCollapse} sx={{ position: "absolute", top: ".5em", right: ".5em" }}>
            <MenuIcon color="primary" />
          </IconButton>
          <HTMLContainer content={content} />
        </Container>
      </Box>
    </Grid>
  );
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(2),
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
    paddingBlock: theme.spacing(1),
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    // marginRight: theme.spacing(2),
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
      paddingBlock: theme.spacing(1),
    },
  },
}));

function StyledTreeItem(props) {
  const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: "inherit", flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}
