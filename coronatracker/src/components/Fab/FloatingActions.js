import React, { useState } from "react";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import { ExpandLess, HelpOutline, Share, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import ShareDialog from "./ShareDialog";
import FAQsDialog from "./FAQsDialog";

const useStyle = makeStyles({
  speedDial: {
    position: "fixed",
    right: "20px",
    bottom: "80px",
    zIndex: 999,
  },
  speedDialFab: {
    backgroundColor: "#3C3F58",
    color: "#3BBA9C",
    height: "64px",
    width: "64px",
    "&:hover": {
      backgroundColor: "#3C3F58",
    },
  },
  speedDialAction: {
    backgroundColor: "#3C3F58",
    color: "#3BBA9C",
    height: "48px",
    width: "48px",
    "&:hover": {
      backgroundColor: "#3C3F58",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
  },
  tooltip: {
    backgroundColor: "#3C3F58",
    color: "#3BBA9C",
  },
});

export default function FloatingActions() {
  const [infoOpen, setInfo] = useState(false);
  const [shareOpen, setShare] = useState(false);
  const [dialOpen, setDial] = useState(false);

  const classes = useStyle();

  const handleInfoOpen = () => setInfo(true);
  const handleShareOpen = () => setShare(true);
  const handleDialOpen = () => setDial(true);
  const handleInfoClose = () => setInfo(false);
  const handleShareClose = () => setShare(false);
  const handleDialClose = () => setDial(false);

  const actions = [
    { icon: <HelpOutline />, name: "FAQs", onClick: handleInfoOpen },
    { icon: <Share />, name: "Share", onClick: handleShareOpen },
  ];

  return (
    <React.Fragment>
      <SpeedDial
        ariaLabel="Speed Dial"
        classes={{
          root: classes.speedDial,
          fab: classes.speedDialFab,
        }}
        icon={<SpeedDialIcon icon={<ExpandLess />} openIcon={<Close />} />}
        onClose={handleDialClose}
        onOpen={handleDialOpen}
        open={dialOpen}
        direction="up"
      >
        {actions.map(({ icon, name, onClick }) => (
          <SpeedDialAction
            classes={{
              fab: classes.speedDialAction,
              staticTooltipLabel: classes.tooltip,
            }}
            key={name}
            icon={icon}
            tooltipTitle={name}
            tooltipPlacement="left"
            tooltipOpen
            onClick={onClick}
          />
        ))}
      </SpeedDial>
      <ShareDialog open={shareOpen} onClose={handleShareClose} />
      <FAQsDialog open={infoOpen} onClose={handleInfoClose} />
    </React.Fragment>
  );
}
