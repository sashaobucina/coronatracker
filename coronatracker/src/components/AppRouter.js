import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Home from "./Home";
import HeatMap from './Heatmap/HeatMapContainer';
import Peak from "./Peak/PeakContainer";
import Main from "./Main"
import FAQs from "./About/FAQs";
import TopMovers from "./TopMovers/TopMoversContainer";

import { PREFETCH_URL } from "../helpers/misc";
import { NO_ALERT, SERVER_ALERT, SUCCESS_ALERT } from "../helpers/alerts";

export default function AppRouter() {
  const [alert, setAlert] = useState(NO_ALERT);
  const [path, setPath] = useState("/");
  const [fetchState, setState] = useState({
    fetched: false,
    loaded: false,
    topContributors: { contributors: [], labels: [] },
    validCountries: []
  });

  const preFetchData = () => {
    const request1 = axios.get(PREFETCH_URL + "valid-countries")
    const request2 = axios.get(PREFETCH_URL + "top-contributors")

    axios.all([request1, request2]).then(
      axios.spread((...responses) => {
        const validCountries = responses[0].data;
        const topContributors = responses[1].data;
        setState({
          fetched: true,
          loaded: true,
          topContributors: topContributors,
          validCountries: validCountries
        });
        setAlert(SUCCESS_ALERT);
      })
    ).catch(err => {
      console.error(err);
      setState({
        fetched: false,
        loaded: true,
        topContributors: { contributors: [], labels: [] },
        validCountries: []
      });
      setAlert(SERVER_ALERT);
    })
  }

  useEffect(() => {
    preFetchData();
  }, []);

  const { fetched, loaded, topContributors, validCountries } = fetchState;

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
          <Route
            exact
            path="/"
            render={(props) => 
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
          <Route exact path="/faqs" render={(props) => <FAQs {...props} updatePath={setPath} />} />
        </Switch>
      </Main>
    </Router>
  );
}