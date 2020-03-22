import React, { Component } from 'react';
import '../style/App.css';
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import SearchButton from "./SearchButton/SearchButton";
import GraphOverall from "./Graph/GraphOverall";
import { Grid } from "@material-ui/core"
import GraphDerivative from './Graph/GraphDerivative';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      country: '',
      userInput: '',
      graphData: undefined,
      validCountries: [],
      validated: true
    };

    /* Bindings */
    this.prefetchData = this.prefetchData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateInputState = this.updateInputState.bind(this);
    this.generateGraphs = this.generateGraphs.bind(this);
    this.invalidText = this.invalidText.bind(this);
    this.validateData = this.validateData.bind(this);
  };

  fetchData = () => {
    const { userInput, validCountries } = this.state;
    if (validCountries.includes(userInput)) {
      const url = "http://localhost:5000/covid19/" + userInput;
      axios.get(url).then(res => {
        this.setState({
          country: userInput,
          graphData: res.data,
          validated: true
        });
      }).catch(err => {
        console.error(err);
      });
    } else {
      this.setState({
        validated: false
      })
    }
  }

  prefetchData = () => {
    const url = "http://localhost:5000/valid-countries";
    axios.get(url).then(res => {
      this.setState({
        validCountries: res.data
      })
    })
  };

  updateInputState = (value) => {
    this.setState({
      userInput: value
    })
  }

  validateData = (value) => {
    const { validCountries } = this.state;
    return validCountries.includes(value)
  }

  componentDidMount() {
    this.prefetchData();
  };

  generateGraphs = (country) => {
    const { graphData } = this.state
    const overallData = graphData.overall;
    const firstDerivData = graphData.first_derivative_data;
    const secondDerivData = graphData.second_derivative_data;

    const component = (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={12}>
          <h2 style={{ textAlign: "center" }}>COVID-19 Cases ({country})</h2>
        </Grid>
        <Grid item xs={10} sm={10}>
          <GraphOverall data={overallData} />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <h3 style={{ textAlign: "center" }}>Rate of Change in Cases</h3>
          <GraphDerivative data={firstDerivData} dataKey={"First Derivative"} />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <h3 style={{ textAlign: "center" }}>Acceleration of Change</h3>
          <GraphDerivative data={secondDerivData} dataKey={"Second Derivative"} />
        </Grid>
      </Grid>
    )
    return component
  }

  invalidText = () => {
    const { validated } = this.state;
    if (!validated) {
      return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <p style={{ color: "red", textAlign: "center", fontSize: 13 }}>Invalid country entered!</p>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <p style={{ color: "#3BBA9C", textAlign: "center", fontSize: 13 }}>Search "Global" to get world view</p>
        </Grid>
      )
    }
  }

  render() {
    const { graphData, validCountries, country, userInput } = this.state
    return (
      <div id="root-app">
        <Grid container spacing={2} direction="row" justify="center" alignItems="center" >
          { this.invalidText() }
          <Grid item sm xs />
          <Grid item xs={5} sm={5} md={4} lg={4}>
            <SearchBar
              suggestions={validCountries}
              fetchData={this.fetchData}
              updateState={this.updateInputState}
              validateData={this.validateData}
              value={userInput}
            />
          </Grid>
          <Grid item sm={3} xs={3} md={2} lg={2}>
            <SearchButton fetchData={this.fetchData} />
          </Grid>
          <Grid item sm xs />
          { graphData ? this.generateGraphs(country) : <></> }
        </Grid>
      </div>
    )
  };
}

export default App;
