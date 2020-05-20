import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from "axios";
import { isEmpty } from "lodash";
import { Grid, Typography } from "@material-ui/core";

import { AppContext } from "../App";
import Footer from './Footer';
import GraphBundle from '../Graphs/GraphBundle';
import LandingPage from './LandingPage';
import SearchContainer from "./SearchContainer";
import TabsContainer from '../Tabs/TabsContainer';

import { getCountry } from '../../helpers/conversions';
import { COUNTRY_DATA_URL } from '../../helpers/misc';
import { COUNTRY_ALERT, SERVER_ALERT, NO_ALERT, DUPLICATE_ALERT } from '../../helpers/alerts';

const initialState = {
  countries: [],
  data: [],
  tabIndex: 0
};

export default function Home(props) {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { countries, data, tabIndex } = state;
  const { dispatch } = useContext(AppContext);
  const {
    fetched,
    match,
    topContributors,
    validCountries
  } = props;
  const pathRef = useRef(match.url);

  // update the current path on component render
  useEffect(() => {
    dispatch({ type: "update-path", payload: pathRef.current });
  }, [dispatch]);

  function fetchData(query) {
    if (!fetched || query === "") {
      return;
    }

    // try getting country from previous tab
    let maybeCountry = getCountry(query, countries);
    if (maybeCountry) {
      maybeCountry === countries[tabIndex]
        ? setAlert(DUPLICATE_ALERT)
        : setState(prevState => ({
            ...prevState,
            tabIndex: countries.indexOf(maybeCountry)
          }));
      return;
    }

    // otherwise need to perform fetch if valid country
    maybeCountry = getCountry(query, validCountries);
    maybeCountry ? performFetch(maybeCountry) : setAlert(COUNTRY_ALERT);
  }

  function performFetch(country) {
    // limit tabs to maximum of 8
    const len = countries.length;
    const currCountries = len < 8 ? countries: countries.slice(0, -1);
    const currData = len < 8 ? data : data.slice(0, -1);

    setLoading(true);

    const url = COUNTRY_DATA_URL(country);
    axios.get(url).then(res => {
      setState(prevState => ({
        ...prevState,
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

  function setAlert(alert) {
    dispatch({ type: "set-alert", payload: alert });
  }

  function removeTab(e, index) {
    e.stopPropagation();

    const fn = (_, i) => i !== index;
    const newTabIndex = (index > tabIndex) ? tabIndex : Math.max(0, tabIndex - 1);

    setState(state => ({
      ...state,
      countries: countries.filter(fn),
      data: data.filter(fn),
      tabIndex: newTabIndex
    }));
  }

  function handleTabChange(value) {
    setState(state => ({
      ...state,
      tabIndex: value
    }));
  }

  function clearState() {
    setState(initialState);
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

  function showFrontPage() {
    return data.length === 0
      ? fetched
        ? (<LandingPage fetchFn={fetchData} topContributors={topContributors} />)
        : null
      : (
          <GraphBundle
            country={countries[tabIndex]}
            data={data[tabIndex]}
          />
      );
  }

  return (
    <div id="root-app" style={{ marginTop: "50px" }}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={1} sm={1} md={1} lg={1} />
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Typography variant="body1" color="inherit" align="center" style={{ marginTop: 40 }}>
            Tracking COVID-19 movements and trends - search <b>"Global"</b> to get world view
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SearchContainer
            disabled={loading || isEmpty(validCountries)}
            searchFn={fetchData}
            suggestions={validCountries}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        { showTabs() }
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        { showFrontPage() }
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Footer />
      </Grid>
    </div>
  );
}
