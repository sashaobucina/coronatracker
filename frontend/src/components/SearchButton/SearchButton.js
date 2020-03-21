import React, { Component } from "react";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/styles";


const styles = {
  root: {
    background: '#3C3F58',
    color: '#3BBA9C',
    height: 48,
    "&:hover": {
      background: '#3C3F58',
    }
  }
}

class SearchButton extends Component {
  render() {
    const { classes, fetchData } = this.props
    return (
      <div>
        <Button
          variant="contained"
          color="inherit"
          fullWidth={true}
          className={classes.root}
          onClick={fetchData}
          startIcon={ <SearchIcon /> }
        >
          Search
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(SearchButton);