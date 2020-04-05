import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";


import App from "./App";
import Main from "./Main"
import FAQs from "./About/FAQs";

import { PREFETCH_URL } from "../helpers/misc";

export default function AppRouter() {
  const [ fetchState, setState] = useState({
    alerts: { errAlert: false, successAlert: false },
    fetched: false,
    loaded: false,
    validCountries: []
  });

  const preFetchData = () => {
    const request1 = axios.get(PREFETCH_URL + "valid-countries")
    const request2 = axios.get(PREFETCH_URL + "top-movers")

    axios.all([request1, request2]).then(
      axios.spread((...responses) => {
        const validCountries = responses[0].data;
        const topMovers = responses[1].data;

        setState({
          alerts: { errAlert: false, successAlert: true },
          fetched: true,
          loaded: true,
          topMovers: topMovers,
          validCountries: validCountries
        })
      })
    ).catch(err => {
      setState({
        alerts: { errAlert: true, successAlert: false },
        fetched: false,
        loaded: true,
        topMovers: undefined,
        validCountries: []
      })
      console.error(err);
    })
  }

  useEffect(() => {
    preFetchData();
  }, []);

  return (
    <Router>
      <Main loaded={fetchState.loaded}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <App {...props} fetchState={fetchState} setFetchState={setState} />}
          />
          <Route exact path="/faqs" component={FAQs} />
        </Switch>
      </Main>
    </Router>
  );
}