import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  root: {
    backgroundColor: "#FF813F",
    color: "#FFFFFF",
    padding: 6,
    "&:hover": {
      backgroundColor: "#FF813F",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      opacity: 0.95,
    },
  },
  text: {
    fontSize: "0.75rem",
    textAlign: "center",
    textShadow: "0 1px 1px rgba(34, 34, 34, 0.05)",
  },
});

const imgStyle = {
  height: "23px",
  width: "24px",
  marginRight: "2px",
};

export default function BuyMeACoffeeButton() {
  const classes = useStyle();
  return (
    <Button
      className={classes.root}
      href="https://www.buymeacoffee.com/sashaobucina"
      size="medium"
      target="_blank"
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Support the Project!"
        style={imgStyle}
      />
      <Typography className={classes.text}>Support the Project</Typography>
    </Button>
  );
}
