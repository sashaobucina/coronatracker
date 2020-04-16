import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  input: {
    color: "#3BBA9C"
  },
  textfield: {
    background: '#3C3F58',
    '& label': {
      color: '#3BBA9C'
    },
    '& label.Mui-focused': {
      color: '#3BBA9C'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#3BBA9C',
      },
      '&:hover fieldset': {
        borderColor: '#3BBA9C'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3BBA9C',
      }
    }
  }
})

export default function TableSearch(props) {
  const { setQuery } = props;
  const classes = useStyles();

  const handleOnChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  }

  return (
    <form noValidate autoComplete="off" style={{ color: "#3BBA9C" }}>
      <TextField
        className={classes.textfield}
        label="Search query"
        InputProps={{ className: classes.input }}
        onChange={handleOnChange}
        size="small"
        variant="outlined"
      />
    </form>
  );
}