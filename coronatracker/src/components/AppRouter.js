import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Home from "./Home";
import HeatMapContainer from './Heatmap/HeatMapContainer';
import PeakContainer from "./Peak/PeakContainer";
import Main from "./Main"
import FAQs from "./About/FAQs";
import TopMovers from "./TopMovers/TopMovers";
import NotLoaded from "./NotFound/NotLoaded";

import { PREFETCH_URL } from "../helpers/misc";

export default function AppRouter() {
  const [path, setPath] = useState("/");
  const [ fetchState, setState] = useState({
    alerts: { errAlert: false, successAlert: false },
    fetched: false,
    loaded: false,
    topContributors: { contributors: [], labels: [] },
    topMovers: undefined,
    validCountries: []
  });

  const preFetchData = () => {
    const request1 = axios.get(PREFETCH_URL + "valid-countries")
    const request2 = axios.get(PREFETCH_URL + "top-movers")
    const request3 = axios.get(PREFETCH_URL + "top-contributors")

    axios.all([request1, request2, request3]).then(
      axios.spread((...responses) => {
        const validCountries = responses[0].data;
        const topMovers = responses[1].data;
        const topContributors = responses[2].data;
        setState({
          alerts: { errAlert: false, successAlert: true },
          fetched: true,
          loaded: true,
          topContributors: topContributors,
          topMovers: topMovers,
          validCountries: validCountries
        })
      })
    ).catch(err => {
      setState({
        alerts: { errAlert: true, successAlert: false },
        fetched: false,
        loaded: true,
        topContributors: { contributors: [], labels: [] },
        topMovers: undefined,
        validCountries: []
      })
      console.error(err);
    })
  }

  useEffect(() => {
    preFetchData();
  }, []);

  const { topMovers } = fetchState;

  return (
    <Router hashType="noslash">
      <Main loaded={fetchState.loaded} path={path} updatePath={setPath}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} fetchState={fetchState} setFetchState={setState} updatePath={setPath} />}
          />
          <Route exact path="/top-movers" render={(props) => topMovers !== undefined ? <TopMovers {...props} topMovers={topMovers} updatePath={setPath} /> : <NotLoaded />} />
          <Route exact path="/peak-data" render={(props) => <PeakContainer {...props} updatePath={setPath} />} />
          <Route exact path="/heatmap" render={(props) => <HeatMapContainer {...props} updatePath={setPath} />} />
          <Route exact path="/faqs" render={(props) => <FAQs {...props} updatePath={setPath} />} />
        </Switch>
      </Main>
    </Router>
  );
}