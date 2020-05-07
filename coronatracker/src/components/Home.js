import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";

import ContributorGraph from './Graphs/ContributorGraph';
import Footer from './Footer';
import GraphBundle from './Graphs/GraphBundle';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from "./Buttons/SearchButton";
import SummaryContainer from './Summary/SummaryContainer';
import TabsContainer from './Tabs/TabsContainer';

import { getCountry, FETCH_URL } from '../helpers/misc';
import { COUNTRY_ALERT, SERVER_ALERT, NO_ALERT, DUPLICATE_ALERT } from '../helpers/alerts';

export default function Home(props) {
  const [state, setState] = useState({
    countries: [],
    data: [],
    tabIndex: 0,
    userInput: ""
  });
  const [loading, setLoading] = useState(false);

  const {
    countries,
    data,
    tabIndex,
    userInput
  } = state;
  const {
    fetched,
    match,
    setAlert,
    topContributors,
    updatePath,
    validCountries
  } = props;

  // update the current path on component render
  useEffect(() => {
    updatePath(match.url);
  }, [match, updatePath]);

  function fetchOnInput() {
    let maybeCountry;

    if (!fetched || userInput === "") {
      return;
    }

    // try getting country from previous tab
    maybeCountry = getCountry(userInput, countries);
    if (maybeCountry) {
      // set alert that country is already being shown if redundant query
      if (maybeCountry === countries[tabIndex]) {
        setAlert(DUPLICATE_ALERT);
      }

      setState(state => ({
        ...state,
        tabIndex: countries.indexOf(maybeCountry)
      }));
      return;
    }

    // otherwise need to perform fetch if valid country
    maybeCountry = getCountry(userInput, validCountries);
    maybeCountry ? fetchData(maybeCountry) : setAlert(COUNTRY_ALERT);
  }

  function removeTab(e, index) {
    e.stopPropagation();

    const fn = (_, i) => i !== index;
    const newTabIndex = index > tabIndex ? tabIndex : Math.max(0, tabIndex - 1);

    setState(state => ({
      ...state,
      countries: countries.filter(fn),
      data: data.filter(fn),
      tabIndex: newTabIndex
    }));
  }

  function fetchData(country) {
    // prepare the data; limit tabs to 8
    const n = countries.length
    const MAX_TABS = 8;
    const currCountries = n < MAX_TABS ? countries: countries.slice(0, -1);
    const currData = n < MAX_TABS ? data : data.slice(0, -1);

    // set boolean flag to indicate loading new data
    setLoading(true);

    const url = `${FETCH_URL}/${country}`
    axios.get(url).then(res => {
      setState(state => ({
        ...state,
        countries: [...currCountries, country],
        data: [...currData, res.data],
        tabIndex: currCountries.length
      }));
      setAlert(NO_ALERT);
    }).catch(err => {
      console.error(err);
      setAlert(SERVER_ALERT);
    }).finally(() => {
      setLoading(false);
    });
  }

  function showTabs() {
    return countries.length !== 0
      ? (
        <TabsContainer
          countries={countries}
          clearState={clearState}
          handleTabChange={handleTabChange}
          tabIndex={tabIndex}
          removeTab={removeTab}
        />
      )
      : null
  }

  function showGraphs() {
    const { date, graph } = topContributors;
    const { contributors, labels } = graph;
    return data.length === 0
      ? fetched
        ? (<>
            <ContributorGraph labels={labels} data={contributors} date={date} />
            <SummaryContainer data={topContributors.summary} fetchFn={fetchData} />
          </>)
        : null
      : (
        <GraphBundle
          country={countries[tabIndex]}
          data={data[tabIndex]}
        />
      )
  }

  function clearState() {
    setState(state => ({
      ...state,
      countries: [],
      data: [],
      tabIndex: 0
    }));
  }

  function handleTabChange(value) {
    setState(state => ({
      ...state,
      tabIndex: value
    }));
  }

  function updateInputState(value) {
    setState(state => ({
      ...state,
      userInput: value
    }));
  }

  return (
    <div id="root-app" style={{ marginTop: "50px" }}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={1} sm={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Typography variant="body1" color="inherit" align="center" style={{ marginTop: 40 }}>
            Tracking COVID-19 movements and trends - search "<b>Global</b>" to get world view
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} />
        <Grid item sm={2} xs={2} md={3} lg={3} />
        <Grid item xs={5} sm={5} md={4} lg={4}>
          <SearchBar
            suggestions={validCountries}
            fetchData={fetchOnInput}
            updateState={updateInputState}
            style={{ paddingLeft: 10 }}
          />
        </Grid>
        <Grid item sm={3} xs={3} md={2} lg={2}>
          <SearchButton fetchData={fetchOnInput} disabled={loading} />
        </Grid>
        <Grid item xs={2} sm={2} md={3} lg={3} />
      </Grid>
      {showTabs()}
      {showGraphs()}
      <Footer />
    </div>
  );
}
