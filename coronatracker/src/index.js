import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./components/App";
import Main from "./components/Main"
import FAQs from "./components/About/FAQs";

import { PREFETCH_URL } from "./helpers/misc";

import './style/index.css';

function AppRouter() {
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

ReactDOM.render(<AppRouter />, document.getElementById('root'));
