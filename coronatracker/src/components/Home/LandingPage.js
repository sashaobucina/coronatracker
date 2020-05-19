import React, { useState } from "react";
import { concat, find, flatMap, pick, range } from "lodash";
import { Button, Grid, Tooltip, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ContributorGraph from "../Graphs/ContributorGraph";
import SelectionFilter from "./SelectionFilter";
import SummaryCard from "../Summary/SummaryCard";

const useStyle = makeStyles({
  grid: {
    marginBottom: 10,
  },
  button: {
    marginLeft: 8,
    "&:hover": {
      opacity: 0.8,
    },
  },
});

export default function LandingPage(props) {
  const [checkList, setCheckList] = useState(range(10).map(() => true));
  const { fetchFn, topContributors } = props;

  const classes = useStyle();
  const matches = useMediaQuery("(min-width:960px)");
  const size = matches ? "medium" : "small";

  const { date, graph, summary } = topContributors;
  const { contributors, labels } = graph;
  const countries = labels.filter((label) => label !== "date");

  const selectAll = () => setCheckList(range(10).map(() => true));
  const deselectAll = () => setCheckList(range(10).map(() => false));

  const filterData = () => {
    const selectLabels = (bool, idx) => (bool ? countries[idx] : []);
    const selectedLabels = concat(flatMap(checkList, selectLabels), "date");
    return contributors.map((contributor) => pick(contributor, selectedLabels));
  };

  const getCardData = (country) => {
    const { confirmed, deaths, recovered } = summary;
    return {
      confirmed: find(confirmed, { country }),
      deaths: find(deaths, { country }),
      recovered: find(recovered, { country }),
    };
  };

  const getButtonComponent = (country) => (
    <Tooltip title={`Search for ${country}`} placement="right">
      <Button
        className={classes.button}
        color="inherit"
        size="medium"
        variant="outlined"
        onClick={() => fetchFn(country)}
      >
        More Details
      </Button>
    </Tooltip>
  );

  const getCards = () =>
    checkList.reduce((acc, curr, idx) => {
      if (curr) {
        const country = countries[idx];
        acc.push(
          <React.Fragment key={idx}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SummaryCard
                data={getCardData(country)}
                buttonComponent={getButtonComponent(country)}
                index={idx + 1}
                subheader={`#${idx + 1} in Cases`}
                size={size}
              />
            </Grid>
          </React.Fragment>
        );
      }
      return acc;
    }, []);

  return (
    <Grid container className={classes.grid} spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ContributorGraph labels={labels} data={filterData()} date={date} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <SelectionFilter
          checkList={checkList}
          countries={countries}
          deselectAll={deselectAll}
          selectAll={selectAll}
          setCheckList={setCheckList}
          size={size}
        />
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
        <Grid container className={classes.grid} justify="center" spacing={3}>
          {getCards()}
        </Grid>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
    </Grid>
  );
}
