import React, { useState } from "react";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  Menu,
  MenuItem
} from "@material-ui/core";
import {
  Bookmarks,
  CenterFocusStrong,
  ZoomIn,
  ZoomOut
} from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";

const continents = [
  { continent: "Europe", position: { coordinates: [12, 50], zoom: 4 }},
  { continent: "North America", position: { coordinates: [-115, 42], zoom: 2 }},
  { continent: "Central America", position: { coordinates: [-91.3, 17.3], zoom: 5.2 }},
  { continent: "South America", position: { coordinates: [-73, -32], zoom: 1.78 }},
  { continent: "Asia", position: { coordinates: [112, 30], zoom: 2.25 }},
  { continent: "Middle East", position: { coordinates: [46.5, 27.5], zoom: 5.2 }},
  { continent: "Australia & Oceania", position: { coordinates: [135, -27], zoom: 2.7 }},
  { continent: "Africa", position: { coordinates: [6.5, -4.5], zoom: 1.85 }},
];

const StyledMenuItem = withStyles({
  root: {
    background: "#2E3047",
    color: "#3BBA9C",
  }
})(MenuItem);

const StyledMenu = withStyles({
  paper: {
    background: "#2E3047",
    color: "#3BBA9C"
  }
})(Menu);

export default function HeatMapButtons(props) {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const { disabled, handleReCenter, handleZoomIn, handleZoomOut, setPosition } = props;

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleMenuItemClick = (position) => () => {
    setPosition(position);
    setAnchorEl(null);
  }

  const generateMenuItems = () => {
    return continents.map(({ continent, position }, i) => (
      <StyledMenuItem
        key={i}
        dense
        onClick={handleMenuItemClick(position)}
      >
        {continent}
      </StyledMenuItem>
    ));
  }

  return (
    <ButtonGroup color="inherit" size="small">
      <Tooltip title="Zoom In" placement="left">
        <span>
          <IconButton color="inherit" onClick={handleZoomIn} disabled={disabled}>
            <ZoomIn />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Re-center" placement="bottom">
        <span>
          <IconButton color="inherit" onClick={handleReCenter} disabled={disabled}>
            <CenterFocusStrong />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Zoom Out" placement="bottom">
        <span>
          <IconButton color="inherit" onClick={handleZoomOut} disabled={disabled}>
            <ZoomOut />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Bookmarks" placement="right">
        <span>
          <IconButton color="inherit" onClick={handleMenuClick} disabled={disabled}>
            <Bookmarks />
          </IconButton>
        </span>
      </Tooltip>
      <StyledMenu
        id="bookmarks-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        elevation={5}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        variant="menu"
      >
        {generateMenuItems()}
      </StyledMenu>
    </ButtonGroup>
  );
}