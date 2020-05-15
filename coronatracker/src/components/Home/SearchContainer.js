import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import SearchButton from "../Buttons/SearchButton";
import SearchBar from "./SearchBar";

export default function SearchContainer(props) {
  const [ userInput, setUserInput ] = useState("");
  const { disabled, searchFn, suggestions } = props;

  const handleFetch = () => {
    searchFn(userInput);
  }

  const handleInputUpdate = (e) => {
    setUserInput(e.target.value);
  }

  return (
    <Grid container alignItems="center">
      <Grid item xs={2} sm={2} md={3} lg={3} />
      <Grid item xs={5} sm={5} md={4} lg={4}>
        <SearchBar
          suggestions={suggestions}
          searchFn={handleFetch}
          updateInput={handleInputUpdate}
        />
      </Grid>
      <Grid item xs={3} sm={3} md={2} lg={2}>
        <SearchButton
          onClick={handleFetch}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={2} sm={2} md={3} lg={3} />
    </Grid>
  );
}