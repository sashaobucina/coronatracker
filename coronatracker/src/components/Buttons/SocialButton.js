import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  iconButton: {
    margin: 7,
    "&:hover": {
      opacity: 0.9
    }
  }
})

export default function ShareButton({ color, icon, href, title }) {
  const classes = useStyle();
  return (
    <Tooltip placement="bottom" title={`Share with ${title}`}>
      <IconButton
        className={classes.iconButton}
        href={href}
        target="_blank"
        style={{ backgroundColor: color }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}