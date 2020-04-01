import React from "react";
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  paper: {
    color: '#3BBA9C',
    background: '#3C3F58',
  },
  color: {
    color: '#3BBA9C'
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
        borderColor: '#3BBA9C'
      },
      '&:hover fieldset': {
        borderColor: '#3BBA9C'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3BBA9C'
      }
    }
  }
})

export default function SearchBar(props) {
  const { suggestions, updateState } = props;
  const classes = useStyles();

  return (
    <div style={{ textAlign: "center" }}>
      <AutoComplete
        id="autocomplete-main"
        classes={{
          input: classes.color,
          clearIndicator: classes.color,
          popupIndicator: classes.color,
          popupIndicatorOpen: classes.color,
          paper: classes.paper,
          noOptions: classes.color
        }}
        freeSolo
        options={suggestions}
        onSelect={(e) => updateState(e.target.value)}
        noOptionsText={"No countries match your search..."}
        renderInput={params => (
          <TextField
            {...params}
            className={classes.textfield}
            label="Search for a country"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
  );
}