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
    axios.get(PREFETCH_URL).then(res => {
      console.log(res)
      setState({
        alerts: { errAlert: false, successAlert: true },
        fetched: true,
        loaded: true,
        validCountries: res.data
      })
    }).catch(err => {
      setState({
        alerts: { errAlert: true, successAlert: false },
        fetched: false,
        loaded: true,
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