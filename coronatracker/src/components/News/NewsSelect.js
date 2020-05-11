import React from "react"
import {
  FormControl,
  InputBase,
  Select,
  MenuItem,
  FormLabel
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  formControl: {
    color: "#3BBA9C",
    width:"100%"
  },
  formLabel: {
    color: "#3BBA9C",
    fontSize: 12,
    marginBottom: 10,
    "&.Mui-focused": {
      color: "#3BBA9C"
    }
  },
  selectIcon: {
    color: "#3BBA9C"
  },
  menu: {
    background: "#2E3047",
    color: "#3BBA9C"
  }
});

const StyledInput = withStyles({
  root: {
    color: "#3BBA9C"
  },
  input: {
    color: "#3BBA9C",
    borderRadius: 4,
    border: "1px solid #3BBA9C",
    position: "relative",
    padding: '10px 26px 10px 12px',
    "&:focus": {
      color: "#3BBA9C",
      borderRadius: 4,
      border: "1px solid #3BBA9C",
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
})(InputBase);

export default function NewsSelect(props) {
  const { fetching, value, setValue, supportedValues, title } = props;

  const classes = useStyle();

  const getMenuItems = () => {
    return supportedValues
      .map((valueItem, idx) => (
        <MenuItem
          key={idx}
          value={valueItem}
        >
          {valueItem}
        </MenuItem>
      ))
  }

  return (
    <FormControl className={classes.formControl}>
      <FormLabel className={classes.formLabel}>
        {title}
      </FormLabel>
      <Select
        classes={{ icon: classes.selectIcon }}
        disabled={supportedValues.length === 0 || fetching}
        input={<StyledInput />}
        value={value}
        onChange={setValue}
        label="Select country"
        placeholder="Select country"
        MenuProps={{
          anchorOrigin:{
            vertical: "bottom",
            horizontal: "left"
          },
          getContentAnchorEl: null,
          classes: {paper: classes.menu},
        }}
      >
        {getMenuItems()}
      </Select>
    </FormControl>
  );
}