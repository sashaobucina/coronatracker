import React, { Component } from 'react';
import '../style/App.css';
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import SearchButton from "./SearchButton/SearchButton";
import GraphOverall from "./Graph/GraphOverall";
import { Grid, ButtonGroup, Button, Typography, Link, IconButton } from "@material-ui/core"
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import GraphDerivative from './Graph/GraphDerivative';
import DateSlider from './Slider/DateSlider';
import GraphTrajectory from './Graph/GraphTrajectory';

function convertData(overall, idx) {
  const filteredData = overall.filter((entry) => entry.confirmed !== 0);

  let data = filteredData.map((entry, idx, arr) => {
    const weeklyVal = idx < 7 ? 0 : arr[idx]["confirmed"] - arr[idx - 7]["confirmed"];
    return {
      cases: entry.confirmed,
      weekly: Math.round(weeklyVal)
    };
  });

  data = data.filter((entry) => entry.weekly >= 10);
  return data.slice(0, idx)
}

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      country: '',
      idxValue: 0,
      userInput: '',
      graphData: undefined,
      scale: "log",
      validCountries: [],
      validated: true
    };

    /* Bindings */
    this.prefetchData = this.prefetchData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateInputState = this.updateInputState.bind(this);
    this.updateIdxState = this.updateIdxState.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);
    this.generateGraphs = this.generateGraphs.bind(this);
    this.invalidText = this.invalidText.bind(this);
    this.validateData = this.validateData.bind(this);
  };

  fetchData = () => {
    const { userInput, validCountries } = this.state;
    const filteredCountries = validCountries.filter((country) => country.toLowerCase() === userInput.toLowerCase());
    if (filteredCountries.length > 0) {
      const country = filteredCountries[0];
      const url = "http://localhost:5000/covid19/" + country;
      axios.get(url).then(res => {
        this.setState({
          country: country,
          graphData: res.data,
          idxValue: 0,
          validated: true
        });
      }).catch(err => {
        console.error(err);
      });
    } else {
      this.setState({
        country: '',
        graphData: undefined,
        idxValue: 0,
        validated: false
      });
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

  updateIdxState = (idx) => {
    this.setState({
      idxValue: idx
    })
  }

  validateData = (value) => {
    const { validCountries } = this.state;
    return validCountries.includes(value)
  }

  componentDidMount() {
    this.prefetchData();
  };

  onPlayClick = (n, increment) => {
    const { idxValue } = this.state;
    if (increment) {
      this.setState({
        idxValue: idxValue < n ? idxValue + 1 : 0
      })
    } else {
      this.setState({
        idxValue: idxValue > 0 ? idxValue - 1 : n
      })
    }
  }

  generateGraphs = (country) => {
    const { graphData, idxValue, scale } = this.state;
    const overallData = graphData.overall;
    const firstDerivData = graphData.first_derivative_data;
    const secondDerivData = graphData.second_derivative_data;

    const rateData = convertData(overallData);
    const n = overallData.length;
    const dates = overallData.slice(n - rateData.length, n).map(entry => entry.date)

    const component = (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={12}>
          <Typography align="center" variant="h4">COVID-19 Cases ({country})</Typography>
        </Grid>
        <Grid item xs={10} sm={10}>
          <GraphOverall data={overallData} />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <Typography align="center" variant="h5">Rate of Change in Cases</Typography>
          <GraphDerivative data={firstDerivData} dataKey={"first_derivative"} />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <Typography align="center" variant="h5">Acceleration of Change</Typography>
          <GraphDerivative data={secondDerivData} dataKey={"second_derivative"} />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} style={{ marginBottom: 20 }}>
          <Typography align="center" style={{ textTransform: "capitalize" }} variant="h5">COVID-19 Trajectory ({scale})</Typography>
          <GraphTrajectory data={rateData.slice(0, idxValue)} scale={scale} />
          <ButtonGroup color="primary">
            <Button variant="contained" disabled={scale === "log"} onClick={() => this.setState({ scale: "log" })}>Log</Button>
            <Button variant="contained" disabled={scale === "linear"} onClick={() => this.setState({ scale: "linear" })}>Linear</Button>
          </ButtonGroup>
          <Typography align="center" fontStyle="oblique" style={{ marginBottom: 40 }} variant="body2">← Tune slider to view changes over time →</Typography>
          <DateSlider dates={dates} updateState={this.updateIdxState} value={idxValue} />
          <ButtonGroup color="inherit" size="medium" variant="outlined">
            <IconButton onClick={(_) => this.onPlayClick(dates.length - 1, false)}>
              <ArrowBack />
            </IconButton>
            <IconButton onClick={(_) => this.onPlayClick(dates.length - 1, true)}>
              <ArrowForward />
            </IconButton>
          </ButtonGroup>
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
          <Typography variant="subtitle1" color="error" align="center">Invalid country entered! (Ensure correct capitalization)</Typography>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="subtitle1" color="inherit" align="center">Search "Global" to get world view</Typography>
        </Grid>
      )
    }
  }

  render() {
    const { graphData, validCountries, country } = this.state
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
            />
          </Grid>
          <Grid item sm={3} xs={3} md={2} lg={2}>
            <SearchButton fetchData={this.fetchData} />
          </Grid>
          <Grid item sm xs />
          { graphData ? this.generateGraphs(country) : <></> }
        </Grid>
        <Grid item sm xs>
          <Typography align="center" variant="body1" style={{ margin: 20 }}>
            Big thanks to <Link href="https://github.com/CSSEGISandData/COVID-19" color="primary" variant="body1">John Hopkins University</Link> for the data!
          </Typography>
        </Grid>
      </div>
    )
  };
}

export default App;
