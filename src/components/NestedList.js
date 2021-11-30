import React from "react";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import breadcrumbNameMap from "../data/breadcrumbs.json";

function NestedList({ openSection, text, pl }) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const subSections = breadcrumbNameMap[text];
  const handleOpenSection = () => openSection(text);
  return (
    <>
      <ListItemButton
        onClick={subSections ? handleClick : handleOpenSection}
        sx={{ pl }}
      >
        <ListItemText primary={text} />
        {subSections && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {subSections &&
        subSections.map((section, index) => {
          return (
            <Collapse in={open} timeout="auto" unmountOnExit key={index}>
              <List component="div" disablePadding>
                <NestedList
                  openSection={openSection}
                  text={section}
                  pl={pl + 4}
                />
              </List>
            </Collapse>
          );
        })}
    </>
  );
}

export default NestedList;
