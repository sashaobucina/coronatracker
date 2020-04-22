import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";

import AlertManager from "./Alerts/AlertManager"
import ContributorGraph from './Graphs/ContributorGraph';
import Footer from './Footer/Footer';
import GraphBundle from './Graphs/GraphBundle';
import SearchBar from './SearchBar/SearchBar';
import SearchButton from "./Buttons/SearchButton";
import TabsContainer from './Tabs/TabsContainer';

import { getCountry, FETCH_URL } from '../helpers/misc';

export default function Home(props) {
  const [state, setState] = useState({
    countries: [],
    idxValue: 0,
    data: [],
    tabIndex: 0,
    validated: true,
    userInput: ""
  });

  const {
    countries,
    idxValue,
    data,
    tabIndex,
    validated,
    userInput
  } = state;
  const { match, fetchState, setFetchState, updatePath } = props;
  const { fetched, validCountries } = fetchState;

  // update the current path on component render
  useEffect(() => {
    updatePath(match.url);
  }, [match, updatePath]);

  function fetchData() {
    let maybeCountry;

    if (!fetched || userInput === "") {
      return;
    }

    // try getting country from previous tab
    maybeCountry = getCountry(userInput, countries);
    if (maybeCountry) {
      setState(state => ({
        ...state,
        idxValue: 0,
        tabIndex: countries.indexOf(maybeCountry)
      }));
      return;
    }

    // otherwise need to perform fetch if valid country
    maybeCountry = getCountry(userInput, validCountries);
    if (maybeCountry) {
      // prepare the data; limit tabs to 8
      const n = countries.length
      const MAX_TABS = 8;
      const currCountries = n < MAX_TABS ? countries: countries.slice(0, -1);
      const currData = n < MAX_TABS ? data : data.slice(0, -1);

      const url = `${FETCH_URL}/${maybeCountry}`
      axios.get(url).then(res => {
        setState(state => ({
          ...state,
          countries: [...currCountries, maybeCountry],
          data: [...currData, res.data],
          idxValue: 0,
          tabIndex: currCountries.length,
          validated: true
        }));
      }).catch(err => {
        clearState(true);
        console.error(err);
      });
    } else {
      setState(state => ({
        ...state,
        idxValue: 0,
        validated: false
      }));
    }
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

  function showTabs() {
    return countries.length === 0
      ? (<></>)
      : (
        <TabsContainer
          countries={countries}
          clearState={clearState}
          handleTabChange={handleTabChange}
          tabIndex={tabIndex}
          removeTab={removeTab}
        />
      )
  }

  function showGraphs() {
    const { labels, contributors } = fetchState["topContributors"];
    return data.length === 0
      ? fetchState["fetched"] ? (<ContributorGraph labels={labels} data={contributors} />) : (<></>)
      : (
        <GraphBundle
          country={countries[tabIndex]}
          data={data[tabIndex]}
          indexValue={idxValue}
          onStepClick={onStepClick}
          updateIndexState={updateIndexState}
        />
      )
  }

  function clearState(validated) {
    setState(state => ({
      ...state,
      countries: [],
      data: [],
      idxValue: 0,
      tabIndex: 0,
      validated: validated
    }));
  }

  function onStepClick(n, increment) {
    if (increment) {
      setState(state => ({
        ...state,
        idxValue: idxValue < n ? idxValue + 1 : 0
      }));
    } else {
      setState(state => ({
        ...state,
        idxValue: idxValue > 0 ? idxValue - 1 : n
      }));
    }
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

  function updateIndexState(idx) {
    setState(state => ({
      ...state,
      idxValue: idx
    }));
  }

  function setValidation(validated) {
    setState(state => ({
      ...state,
      validated: validated
    }));
  }

  return (
    <div id="root-app" style={{ marginTop: "50px" }}>
      <AlertManager fetchState={fetchState} setFetchState={setFetchState} validated={validated} updateValidation={setValidation}/>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="body1" color="inherit" align="center" style={{ marginTop: 40 }}>
            Tracking COVID-19 movements and trends - search "<b>Global</b>" to get world view
          </Typography>
        </Grid>
        <Grid item sm={2} xs={2} md={3} lg={3} />
        <Grid item xs={5} sm={5} md={4} lg={4}>
          <SearchBar
            suggestions={fetchState["validCountries"]}
            fetchData={fetchData}
            updateState={updateInputState}
            value={userInput}
            style={{ paddingLeft: 10 }}
          />
        </Grid>
        <Grid item sm={3} xs={3} md={2} lg={2}>
          <SearchButton fetchData={fetchData} />
        </Grid>
        <Grid item xs={2} sm={2} md={3} lg={3} />
      </Grid>
      {showTabs()}
      {showGraphs()}
      <Footer />
    </div>
  );
}
