import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Home from "./Home/Home";
import HeatMap from './Heatmap/HeatMapContainer';
import Peak from "./Peak/PeakContainer";
import Main from "./Main"
import News from "./News/NewsContainer";
import TopMovers from "./TopMovers/TopMoversContainer";

import {
  TOP_CONTRIBUTORS_URL,
  VALID_COUNTRIES_URL,
  NEWS_SUPPORTED_URL,
} from "../helpers/misc";
import { NO_ALERT, SERVER_ALERT, SUCCESS_ALERT } from "../helpers/alerts";

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
  const [ alert, setAlert ] = useState(NO_ALERT);
  const [ path, setPath ] = useState("/");
  const [ fetchState, setState ] = useState({
    fetched: false,
    loaded: false,
    supportedCountries: [],
    topContributors: initialTopContributors,
    validCountries: []
  });

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
        setAlert(SUCCESS_ALERT);
      })
    ).catch(err => {
      console.error(err);
      setState((prevState) => ({
        ...prevState,
        loaded: true
      }));
      setAlert(SERVER_ALERT);
    })
  }

  useEffect(() => {
    preFetchData();
  }, []);

  const { fetched, loaded, supportedCountries, topContributors, validCountries } = fetchState;

  return (
    <Router hashType="noslash">
      <Main
        alert={alert}
        loaded={loaded}
        path={path}
        setAlert={setAlert}
        updatePath={setPath}
      >
        <Switch>
          <Route exact path="/" render={(props) =>
            <Home
                {...props}
                fetched={fetched}
                setAlert={setAlert}
                topContributors={topContributors}
                updatePath={setPath}
                validCountries={validCountries}
              />
            }
          />
          <Route exact path="/top-movers" render={(props) => <TopMovers {...props} setAlert={setAlert} updatePath={setPath} />} />
          <Route exact path="/peak-data" render={(props) => <Peak {...props} setAlert={setAlert} updatePath={setPath} />} />
          <Route exact path="/heatmap" render={(props) => <HeatMap {...props} setAlert={setAlert} updatePath={setPath} />} />
          <Route exact path="/news" render={(props) => <News {...props} supportedCountries={supportedCountries} updatePath={setPath} />} />
        </Switch>
      </Main>
    </Router>
  );
}