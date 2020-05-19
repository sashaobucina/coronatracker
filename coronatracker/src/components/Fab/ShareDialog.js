import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { Facebook, LinkedIn, MailOutlined, Twitter } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import SocialButton from "../Buttons/SocialButton";

const useStyle = makeStyles({
  paper: {
    backgroundColor: "#2E3047",
    color: "#3BBA9C",
    padding: 10,
  },
  facebookIcon: {
    color: "#3B5998",
  },
  linkedInIcon: {
    color: "#0E76A8",
  },
  mailIcon: {
    color: "#D44638",
  },
  twitterIcon: {
    color: "#38A1F3",
  },
});

export default function ShareDialog({ open, onClose }) {
  const classes = useStyle();

  return (
    <Dialog classes={{ paper: classes.paper }} open={open} onClose={onClose}>
      <DialogTitle>{"Share this page!"}</DialogTitle>
      <DialogContent>
        <SocialButton
          href="https://www.facebook.com/sharer/sharer.php?u=https://sashaobucina.github.io/coronatracker&amp;src=sdkpreparse"
          icon={<Facebook className={classes.facebookIcon} />}
          title="Facebook"
        />
        <SocialButton
          href="http://linkedin.com/shareArticle?url=https://sashaobucina.github.io/coronatracker&text=Stay%20up-to-date%20with%20the%20latest%20coronavirus%20developments%20using%20the%20COVID-19%20Coronavirus%20Tracker!"
          icon={<LinkedIn className={classes.linkedInIcon} />}
          title="LinkedIn"
        />
        <SocialButton
          href="http://twitter.com/intent/tweet?url=https://sashaobucina.github.io/coronatracker&text=Stay%20up-to-date%20with%20the%20latest%20coronavirus%20developments%20using%20the%20COVID-19%20Coronavirus%20Tracker!"
          icon={<Twitter className={classes.twitterIcon} />}
          title="Twitter"
        />
        <SocialButton
          href="mailto:?subject=COVID-19%20Coronavirus%20Tracker&body=Check%20out%20the%20COVID-19%20Coronavirus%20Tracker%20to%20stay%20up-to-datewith%20the%20latest%20coronavirus%20developments!%20https://sashaobucina.github.io/coronatracker"
          icon={<MailOutlined className={classes.mailIcon} />}
          title="Email"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" size="large">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
