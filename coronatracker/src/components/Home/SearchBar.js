import React, { useState } from "react";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
  root: {
    paddingLeft: 10,
    textAlign: "center"
  },
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
  const [ opened, setOpened ] = useState(false);
  const { searchFn, suggestions, updateInput } = props;

  const classes = useStyle();

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      opened ? setOpened(false) : searchFn();
    }
  }

  const handleFilter = (options, state) => {
    const inputValue = state["inputValue"];
    return options.filter(
      (opt) => opt.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  }

  return (
    <Box className={classes.root}>
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
        filterOptions={handleFilter}
        onClose={() => {setOpened(false)}}
        onOpen={() => {setOpened(true)}}
        options={suggestions}
        onSelect={updateInput}
        renderInput={params => (
          <TextField
            {...params}
            className={classes.textfield}
            label="Search by country"
            margin="normal"
            variant="outlined"
            onKeyDown={handleKeyDown}
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </Box>
  );
}