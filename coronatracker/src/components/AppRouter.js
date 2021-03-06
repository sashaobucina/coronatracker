import React, { useEffect, useState, useContext } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import { AppContext } from "./App";
import AlertManager from "./Alerts/AlertManager";
import Header from "./Header/Header";
import Home from "./Home/Home";
import HeatMap from './Heatmap/HeatMapContainer';
import LoadingProgress from "./Progress/LoadingProgress";
import Peak from "./Peak/PeakContainer";
import News from "./News/NewsContainer";
import FloatingActions from './Fab/FloatingActions';
import TopMovers from "./TopMovers/TopMoversContainer";

import {
  TOP_CONTRIBUTORS_URL,
  VALID_COUNTRIES_URL,
  NEWS_SUPPORTED_URL,
} from "../helpers/misc";
import { SERVER_ALERT, SUCCESS_ALERT } from "../helpers/alerts";

const initialTopContributors = {
  date: "",
  graph: {
    labels: [],
    contributors: []
  },
  summary: {
    confirmed: [],
    deaths: [],
    recovered: []
  }
}

export default function AppRouter() {
  const [ fetchState, setState ] = useState({
    fetched: false,
    loaded: false,
    supportedCountries: [],
    topContributors: initialTopContributors,
    validCountries: []
  });
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const preFetchData = () => {
      const request1 = axios.get(VALID_COUNTRIES_URL);
      const request2 = axios.get(TOP_CONTRIBUTORS_URL);
      const request3 = axios.get(NEWS_SUPPORTED_URL);
  
      axios.all([request1, request2, request3]).then(
        axios.spread((...responses) => {
          const validCountries = responses[0].data;
          const topContributors = responses[1].data;
          const supportedCountries = responses[2].data;
          setState({
            fetched: true,
            loaded: true,
            supportedCountries: supportedCountries,
            topContributors: topContributors,
            validCountries: validCountries
          });
          dispatch({ type: "set-alert", payload: SUCCESS_ALERT });
        })
      ).catch(err => {
        console.error(err);
        setState((prevState) => ({
          ...prevState,
          loaded: true
        }));
        dispatch({ type: "set-alert", payload: SERVER_ALERT });
      })
    };
    preFetchData();
  }, [dispatch]);

  const { fetched, loaded, supportedCountries, topContributors, validCountries } = fetchState;

  return (
    <Router hashType="noslash">
      <AlertManager />
      <LoadingProgress open={!loaded} />
      <Header />
      <FloatingActions />
      <Switch>
        <Route exact path="/" render={(props) =>
          <Home
              {...props}
              fetched={fetched}
              topContributors={topContributors}
              validCountries={validCountries}
            />
          }
        />
        <Route exact path="/top-movers" render={(props) => <TopMovers {...props} />} />
        <Route exact path="/peak-data" render={(props) => <Peak {...props} />} />
        <Route exact path="/heatmap" render={(props) => <HeatMap {...props} />} />
        <Route exact path="/news" render={(props) => <News {...props} supportedCountries={supportedCountries} />} />
      </Switch>
    </Router>
  );
}