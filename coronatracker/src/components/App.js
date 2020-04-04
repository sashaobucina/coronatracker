import React, { Component } from 'react';
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";

import FAQs from './About/FAQs';
import CountryTab from './Tabs/CountryTab';
import ErrorAlert from './Alerts/ErrorAlert';
import Footer from './Footer/Footer';
import Header from './Header/Header'
import GraphBundle from './Graph/GraphBundle';
import LoadingProgress from './Progress/LoadingProgress';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from "./Buttons/SearchButton";
import TabsContainer from './Tabs/TabsContainer';

import { getCountry, FETCH_URL, PREFETCH_URL } from '../helpers/misc';
import { strings } from "../helpers/strings"

import '../style/App.css';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      idxValue: 0,
      userInput: '',
      datum: [],
      loaded: false,
      scale: "log",
      tabs: [],
      tabIndex: 0,
      validCountries: [],
      validated: ""
    };

    /* Bindings */
    this.clearState = this.clearState.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.onStepClick = this.onStepClick.bind(this);
    this.updateInputState = this.updateInputState.bind(this);
    this.updateIndexState = this.updateIndexState.bind(this);
    this.updateScale = this.updateScale.bind(this);
    this.updateValidation = this.updateValidation.bind(this);
  };

  fetchData = () => {
    const { countries, datum, tabs, userInput, validCountries } = this.state;
    let maybeCountry;

    maybeCountry = getCountry(userInput, countries);
    if (maybeCountry) {
      this.setState({
        idxValue: 0,
        tabIndex: countries.indexOf(maybeCountry)
      });
      return;
    }

    maybeCountry = getCountry(userInput, validCountries);
    if (maybeCountry) {
      // prepare the data; limit tabs to 8
      const n = countries.length
      const MAX_TABS = 8;
      const currCountries = n < MAX_TABS ? countries: countries.slice(0, -1);
      const currDatum = n < MAX_TABS ? datum : datum.slice(0, -1);
      const currTabs = n < MAX_TABS ? tabs : tabs.slice(0, -1)

      const url = FETCH_URL + maybeCountry;
      axios.get(url).then(res => {
        this.setState({
          countries: [...currCountries, maybeCountry],
          datum: [...currDatum, res.data],
          idxValue: 0,
          tabs: [...currTabs, this.newTab(maybeCountry, currTabs.length)],
          tabIndex: currTabs.length,
          validated: ""
        });
      }).catch(err => {
        this.clearState(strings.fetch);
        console.error(err);
      });
    } else {
      this.setState({
        idxValue: 0,
        validated: strings.invalid
      });
    }
  }

  prefetchData = () => {
    axios.get(PREFETCH_URL).then(res => {
      this.setState({
        loaded: true,
        validCountries: res.data
      })
    }).catch(err => {
      this.setState({
        loaded: true,
        validated: strings.fetch
      })
      console.error(err);
    })
  };

  newTab = (country, index) => {
    return (
      <CountryTab
        country={country}
        key={index}
        index={index}
        handleClose={this.removeTab}
        handleChange={this.handleTabChange}
      />
    )
  }

  removeTab = (e, index) => {
    e.stopPropagation();

    const { countries, datum, tabs, tabIndex } = this.state;
    const fn = (_, i) => i !== index;
    const newTabIndex = index > tabIndex ? tabIndex : Math.max(0, tabIndex - 1);
    const newTabs = tabs.map((tab, i) => {
      return i > index ? this.newTab(countries[i], i - 1) : tab;
    })

    this.setState({
      countries: countries.filter(fn),
      datum: datum.filter(fn),
      tabs: newTabs.filter(fn),
      tabIndex: newTabIndex
    });
  }

  showTabs = () => {
    const { tabs, tabIndex } = this.state;
    return tabs.length === 0
      ? (<></>)
      : (
        <TabsContainer
          clearState={this.clearState}
          handleTabChange={this.handleTabChange}
          tabs={tabs}
          tabIndex={tabIndex}
          removeTab={this.removeTab}
        />
      )
  }

  showGraphs = () => {
    const { countries, datum, idxValue, scale, tabIndex } = this.state;
    return datum.length === 0
      ? (<FAQs />)
      : (
        <GraphBundle
          country={countries[tabIndex]}
          data={datum[tabIndex]}
          indexValue={idxValue}
          scale={scale}
          onStepClick={this.onStepClick}
          updateIndexState={this.updateIndexState}
          updateScale={this.updateScale}
        />
      )
  }

  clearState = (validated) => {
    this.setState({
      countries: [],
      datum: [],
      tabs: [],
      idxValue: 0,
      tabIndex: 0,
      validated: validated
    });
  }

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

  handleTabChange = (value) => {
    this.setState({
      tabIndex: value
    })
  }

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

  updateValidation = (validated) => {
    this.setState({
      validated: validated
    })
  }

  componentDidMount() {
    this.prefetchData();
  };

  render() {
    const { loaded, validated, validCountries, userInput } = this.state;

    return (
      <div id="root-app">
        <ErrorAlert open={validated !== ""} message={validated} handleClose={() => this.updateValidation("")} />
        <LoadingProgress open={!loaded} />
        <Header />
        <Grid container spacing={2} direction="row" justify="center" alignItems="center" >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="body1" color="inherit" align="center" style={{ marginTop: 40 }}>
              Tracking COVID-19 movements and trends - search "Global" to get world view
            </Typography>
          </Grid>
          <Grid item sm xs md lg />
          <Grid item xs={5} sm={5} md={4} lg={4}>
            <SearchBar
              suggestions={validCountries}
              fetchData={this.fetchData}
              updateState={this.updateInputState}
              value={userInput}
            />
          </Grid>
          <Grid item sm={3} xs={3} md={2} lg={2}>
            <SearchButton fetchData={this.fetchData} />
          </Grid>
          <Grid item sm xs md lg />
        </Grid>
        { this.showTabs() }
        { this.showGraphs() }
        <Footer />
      </div>
    )
  };
}

export default App;
