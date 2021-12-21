import { Grid, Box, IconButton, Collapse, Typography } from "@mui/material";
import { Container, HTMLContainer } from "components";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

// const GridItemXs12 = (props) => <Grid item xs={12} {...props} />;

// const Collapse = (props) => {
//   return (
//     <MuiCollapse
//       component={GridItemXs12}
//       classes={{
//         hidden: { padding: "0 !important" },
//         root: { width: "100%" }
//       }}
//       {...props}
//     >
//       {/* This spacing has to match with the one in the container
//             outside the collapse */}
//       <Grid container spacing={2}>
//         {props.children}
//       </Grid>
//     </MuiCollapse>
//   );
// };

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
            marginInline: collapse ? 0 : 1,
            transition: "width ease 0.5s",
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
            marginInline: 1,
            position: "relative",
            transition: "width ease 0.5s",
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
    // <Grid item laptop={12} container spacing={2}>
    //     <Grid item laptop={collapse ? 0 : 3} sx={{ width: collapse ? "0 !important" : "100%", transition: "ease 0.5s" }}>
    //       <Container noPadding sx={{ height: "35vw", overflow: "auto" }}>
    //         <Box component="div" sx={{ p: 3 }}>
    //           <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
    //             {campaign?.flavor.diary.map((node) => renderTree(node))}
    //           </TreeView>
    //         </Box>
    //       </Container>
    //     </Grid>
    //   <Grid item laptop={collapse ? 12 : 9} sx={{ transition: "ease 0.5s" }}>
    //     <Container sx={{ height: "35vw", overflow: "auto", position: "relative" }}>
    //       <IconButton onClick={handleCollapse} sx={{ position: "absolute", top: ".5em", right: ".5em" }}>
    //         <MenuIcon color="primary" />
    //       </IconButton>
    //       <HTMLContainer content={content} />
    //     </Container>
    //   </Grid>
    // </Grid>
  );
}
