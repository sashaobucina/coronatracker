import React, { Component } from 'react';
import '../style/App.css';
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import SearchButton from "./SearchButton/SearchButton";
import GraphComponent from "./Graph/GraphComponent";
import { Grid } from "@material-ui/core"

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      country: '',
      graphData: [],
      validCountries: [],
    };

    /* Bindings */
    this.prefetchData = this.prefetchData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateCountryState = this.updateCountryState.bind(this);
  };

  fetchData() {
    const { country } = this.state;
    const url = "http://localhost:5000/covid19/" + country;
    axios.get(url).then(res => {
      this.setState({
        graphData: res.data
      })
    }).catch(err => {
      console.error(err);
    })
  }

  prefetchData() {
    const url = "http://localhost:5000/valid-countries";
    axios.get(url).then(res => {
      this.setState({
        validCountries: res.data
      })
    })
  };

  updateCountryState = (value) => {
    this.setState({
      country: value
    })
  }

  componentDidMount() {
    this.prefetchData();
  };

  render() {
    const { graphData, validCountries } = this.state
    const component = (
      <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={10} sm={8}>
        <GraphComponent data={graphData} />
      </Grid>
    </Grid>
    )

    return (
      <div id="root-app">
        <Grid container direction="row" justify="center" alignItems="center" >
          <Grid item sm />
          <Grid item sm={4}>
            <SearchBar
              suggestions={validCountries}
              fetchData={this.fetchData}
              updateState={this.updateCountryState}
            />
          </Grid>
          <Grid item sm={1}>
            <SearchButton fetchData={this.fetchData} />
          </Grid>
          <Grid item sm />
          { graphData.length > 0 ? component : <></> }

        </Grid>
      </div>
    )
  };
}

export default App;
