import React, { Component } from 'react';
import '../style/App.css';
import { getCountry, FETCH_URL, PREFETCH_URL } from '../helpers/misc';
import { strings } from "../helpers/strings"
import axios from "axios";
import SearchBar from './SearchBar/SearchBar';
import SearchButton from "./SearchButton/SearchButton";
import { Grid, Typography, Link, IconButton, Tooltip, ButtonGroup } from "@material-ui/core";
import { ClearAll, Close, ArrowBack, ArrowForward } from '@material-ui/icons';
import ErrorAlert from './Alerts/ErrorAlert';
import GraphBundle from './Graph/GraphBundle';
import ScrollableTabs from './Tabs/ScrollableTabs';
import CountryTab from './Tabs/CountryTab';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      idxValue: 0,
      userInput: '',
      datum: [],
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
        validCountries: res.data
      })
    }).catch(err => {
      this.updateValidation(strings.fetch)
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
        <Grid container direction="row" alignItems="center" style={{ marginTop: 50 }}>
          <Grid item xs={1} sm={1} md={1} lg={1} />
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <ScrollableTabs tabs={tabs} tabIndex={tabIndex} />
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <ButtonGroup color="inherit">
            <Tooltip title="Previous tab" placement="top">
                <IconButton onClick={() => this.setState({ tabIndex: Math.max(0, this.state.tabIndex - 1) })}>
                  <ArrowBack />
                </IconButton>
              </Tooltip>
              <Tooltip title="Next tab" placement="top">
                <IconButton onClick={() => this.setState({ tabIndex: Math.min(this.state.tabIndex + 1, this.state.tabs.length - 1) })}>
                  <ArrowForward />
                </IconButton>
              </Tooltip>
              <Tooltip title="Close tab" placement="top">
                <IconButton onClick={(e) => this.removeTab(e, tabIndex)}>
                  <Close />
                </IconButton>
              </Tooltip>
              <Tooltip title="Clear all" placement="top">
                <IconButton onClick={() => this.clearState(true)}>
                  <ClearAll />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </Grid>
        </Grid>
      )
  }

  showGraphs = () => {
    const { countries, datum, idxValue, scale, tabIndex } = this.state;
    return datum.length === 0
      ? (<></>)
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
    const { validated, validCountries, userInput } = this.state;

    return (
      <div id="root-app">
        <ErrorAlert open={validated !== ""} message={validated} handleClose={() => this.updateValidation("")} />
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
