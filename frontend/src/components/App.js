import React, { Component } from 'react';
import '../style/App.css';
import { FETCH_URL, PREFETCH_URL } from '../helpers/misc';
import { convertDataToWeekly } from '../helpers/conversions'
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import SearchButton from "./SearchButton/SearchButton";
import { Grid, Typography, Link } from "@material-ui/core"
import ErrorAlert from './Error/ErrorAlert';
import GraphBundle from './Graph/GraphBundle';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      country: '',
      idxValue: 0,
      userInput: '',
      data: undefined,
      scale: "log",
      validCountries: [],
      validated: true
    };

    /* Bindings */
    this.prefetchData = this.prefetchData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onStepClick = this.onStepClick.bind(this);
    this.updateInputState = this.updateInputState.bind(this);
    this.updateIndexState = this.updateIndexState.bind(this);
    this.updateScale = this.updateScale.bind(this);
  };

  fetchData = () => {
    const { userInput, validCountries } = this.state;
    const filteredCountries = validCountries.filter((country) => country.toLowerCase() === userInput.toLowerCase());
    if (filteredCountries.length > 0) {
      const country = filteredCountries[0];
      const url = FETCH_URL + country;
      axios.get(url).then(res => {
        this.setState({
          country: country,
          data: res.data,
          idxValue: convertDataToWeekly(res.data.overall).length,
          validated: true
        });
      }).catch(err => {
        console.error(err);
      });
    } else {
      this.setState({
        country: '',
        data: undefined,
        idxValue: 0,
        validated: false
      });
    }
  }

  prefetchData = () => {
    axios.get(PREFETCH_URL).then(res => {
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

  updateIndexState = (idx) => {
    this.setState({
      idxValue: idx
    })
  }

  updateScale = (scale) => {
    this.setState({
      scale: scale
    })
  }

  componentDidMount() {
    this.prefetchData();
  };

  onStepClick = (n, increment) => {
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

  render() {
    const { country, data, idxValue, scale, validated, validCountries } = this.state;
    const graphBundle = (
      <GraphBundle
        country={country}
        data={data}
        indexValue={idxValue}
        scale={scale}
        onStepClick={this.onStepClick}
        updateIndexState={this.updateIndexState}
        updateScale={this.updateScale}
      />
    );

    return (
      <div id="root-app">
        <ErrorAlert open={!validated} handleClose={() => this.setState({ validated: true })} />
        <Grid container spacing={2} direction="row" justify="center" alignItems="center" >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="subtitle1" color="inherit" align="center">Search "Global" to get world view</Typography>
          </Grid>
          <Grid item sm xs />
          <Grid item xs={5} sm={5} md={4} lg={4}>
            <SearchBar
              suggestions={validCountries}
              fetchData={this.fetchData}
              updateState={this.updateInputState}
            />
          </Grid>
          <Grid item sm={3} xs={3} md={2} lg={2}>
            <SearchButton fetchData={this.fetchData} />
          </Grid>
          <Grid item sm xs />
          { data ? graphBundle : <></> }
        </Grid>
        <Grid item sm xs>
          <Typography align="center" variant="body1" style={{ margin: 20 }}>
            Big thanks to the <Link href="https://github.com/CSSEGISandData/COVID-19" color="primary" variant="body1">John Hopkins CSSE</Link> for the data!
          </Typography>
        </Grid>
      </div>
    )
  };
}

export default App;
