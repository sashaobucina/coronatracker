import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  iconButton: {
    backgroundColor: "white",
    margin: 7,
    "&:hover": {
      backgroundColor: "white",
      opacity: 0.9
    }
  }
})

export default function ShareButton({ icon, href, title }) {
  const classes = useStyle();
  return (
    <Tooltip placement="bottom" title={`Share with ${title}`}>
      <IconButton
        className={classes.iconButton}
        href={href}
        target="_blank"
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}