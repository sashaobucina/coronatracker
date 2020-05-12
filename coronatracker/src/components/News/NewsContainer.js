import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Link,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NewsBox from "./NewsBox";
import NewsSelect from "./NewsSelect";
import NewsSkeletonBox from "./NewsSkeletonBox";
import { PREFETCH_URL } from "../../helpers/misc";

const useStyle = makeStyles({
  root: {
    marginTop: 70,
    marginBottom: 20
  },
  grid: {
    padding: 15
  },
  paper: {
    border: 0,
    boxShadow: "none",
    background: "#2E3047",
    color: "#3BBA9C",
    width: "100%"
  },
  progress: {
    backgroundColor: "#3C3F58",
    color: "#3BBA9C"
  },
  progressBar: {
    backgroundColor: "#3BBA9C",
    color: "#3BBA9C"
  }
});

export default function NewsContainer(props) {
  const [ news, setNews ] = useState([]);
  const [ fetched, setFetched ] = useState(false);
  const [ selectValue, setSelectValue ] = useState("Canada");
  const { match, supportedCountries, updatePath } = props;

  const classes = useStyle();

  useEffect(() => {
    const fetchData = async (country) => {
      const url = PREFETCH_URL + `news/country/${country}`;
      try {
        setFetched(false);
        const response = await axios.get(url);
        setNews(response.data);
        setFetched(true);
      } catch (e) {
        console.error(e);
        setFetched(true);
      }
    }
    fetchData(selectValue);
  }, [selectValue]);

  useEffect(() => {
    updatePath(match.url);
  }, [match, updatePath]);

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  }

  const progressComponent = (
    <Grid item>
      <LinearProgress classes={{root: classes.progress, bar: classes.progressBar}} variant="query" />
    </Grid>
  );

  return (
    <Grid container className={classes.root} justify="center" alignContent="center" spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography align="center" variant="h4">
          COVID-19 in the News
        </Typography>
      </Grid>
      <Grid item xs={3} sm={4} md={4} lg={5} />
      <Grid item xs={6} sm={4} md={4} lg={2}>
        <NewsSelect
          fetching={!fetched}
          value={selectValue}
          setValue={handleSelectChange}
          title="Country of Interest"
          supportedValues={
            news.length === 0
              ? []
              : supportedCountries
          }
        />
      </Grid>
      <Grid item xs={3} sm={3} md={4} lg={5} />
      <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
        <Grid container className={classes.grid} direction="column" spacing={1}>
          <Grid item>
            <Typography align="left" variant="h5">
              {`Latest News for ${selectValue}`}
            </Typography>
          </Grid>
          <Grid item>
            {fetched
              ? null
              : progressComponent
            }
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {fetched
                ? <NewsBox news={news} />
                : <NewsSkeletonBox />
              }
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography align="center" variant="subtitle2">
          COVID-19 news results powered by <Link href="https://news.google.com">Google News</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}