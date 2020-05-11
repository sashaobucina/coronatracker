import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import NewsCard from "./NewsCard";
import NewsSkeleton from "./NewsSkeleton";
import { PaginationItem } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";

const StyledPaginationItem = withStyles({
  root: {
    borderColor: "rgba(59, 186, 156, 0.5)",
    color: "#3BBA9C",
    "&:hover": {
      opacity: 0.9
    },
    "&.Mui-selected": {
      color: "#3BBA9C",
      border: "1px solid #3BBA9C",
      backgroundColor: "rgba(59, 186, 156, 0.25)",
      "&:hover": {
        backgroundColor: "rgba(59, 186, 156, 0.25)"
      }
    }
  },
})(PaginationItem);

export default function NewsBox(props) {
  const [ page, setPage ] = useState(1);
  const [ pageCount, setPageCount ] = useState(1);
  const { news } = props;

  useEffect(() => {
    setPageCount(Math.ceil(news.length / 10));
  }, [news]);

  const handlePageChange = (_, value) => {
    setPage(value);
  }

  const getNewsCards = () => {
    return news
      .slice((page - 1) * 10, (page - 1) * 10 + 10)
      .map((story, i) => (
        <Grid item key={i}>
          <NewsCard {...story} />
        </Grid>
    ));
  }

  const emptyComponent = (
    <React.Fragment>
      <Grid item>
        <NewsSkeleton animation={false} />
      </Grid>
      <Grid item>
        <Typography align="center" variant="subtitle2">
          No news supported as of right now...
        </Typography>
      </Grid>
    </React.Fragment>
  );

  const newsComponent = (
    <React.Fragment>
      {getNewsCards()}
      <Grid item>
        <Pagination
          count={pageCount}
          color="primary"
          disabled={news.length === 0}
          page={page}
          onChange={handlePageChange}
          size="large"
          variant="outlined"
          renderItem={(item) => <StyledPaginationItem {...item} />}
        />
      </Grid>
    </React.Fragment>
  );

  return (
    <Grid container direction="column" spacing={1}>
      {news.length === 0
        ? emptyComponent
        : newsComponent
      }
    </Grid>
  );
}