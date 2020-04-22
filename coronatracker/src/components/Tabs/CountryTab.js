import React from "react";
import { Tab, IconButton, Tooltip } from "@material-ui/core";
import { Close } from "@material-ui/icons";

export default function CountryTab(props) {
  const { country, index, handleClose, handleChange } = props;

  const handleOnClick = (index) => (e) => {
    handleClose(e, index);
  }

  return (
    <Tab
      component="div"
      onClick={() => handleChange(index)}
      label={(
        <div>
          {country}
          <Tooltip title="Remove tab" placement="bottom">
            <IconButton color="inherit" size="small" onClick={handleOnClick(index)}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      )}
    />
  )
}