import React from "react";
import { Fab, Tooltip, useMediaQuery } from "@material-ui/core";
import { HelpOutlineOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  fab: {
    backgroundColor: "#3C3F58",
    color: "#3BBA9C",
    display: "flex",
    position: "fixed",
    bottom: "5rem",
    right: "2rem",
    zIndex: 99,
    "&:hover": {
      backgroundColor: "#3C3F58",
    },
  },
});

export default function InfoFab({ onClick }) {
  const classes = useStyle();
  const size = useMediaQuery('(min-width:600px)') ? "large" : "medium";

  return (
    <Tooltip placement="left" title="FAQs">
      <Fab className={classes.fab} size={size} onClick={onClick}>
        <HelpOutlineOutlined />
      </Fab>
    </Tooltip>
  );
}
