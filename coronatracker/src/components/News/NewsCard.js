import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import noImage from "../../static/no_photo_available.png";

const useStyle = makeStyles({
  card: {
    border: "2px solid #3BBA9C",
    background: "#2E3047",
    boxShadow: "none",
    color: "#3BBA9C",
    "&:hover": {
      opacity: 0.85
    }
  },
  cover: {
    minHeight: 96,
    height: "90%",
    width: "90%",
    borderRadius: 5,
    margin: 5
  },
  publishDate: {
    padding: 10
  },
  subheader: {
    color: "#7DB3A6",
    fontSize: "0.85em"
  },
  title: {
    color: "#3BBA9C",
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: 5
  }
})

const since = (published) => {
  const now = Date.now();

  let publishDate = published;
  if (typeof published.getTime !== "function") {
    publishDate = new Date(published);
  }

  let hoursAgo = (now - publishDate.getTime()) / (1000 * 60 * 60);
  hoursAgo = Math.abs(Math.round(hoursAgo));

  if (hoursAgo === 0) {
    return "less than an hour ago";
  } else if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  } else {
    let daysAgo = Math.abs(Math.round(hoursAgo / 24));
    return `${daysAgo}d ago`
  }
}

export default function NewsCard(props) {
  const { description, image, link, published, title } = props;
  const classes = useStyle();

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{  textDecoration: "none" }}>
      <Card className={classes.card}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={3} sm={3} md={2} lg={2}>
            <CardMedia
              className={classes.cover}
              image={image === null ? noImage : image}
              title={title}
            />
          </Grid>
          <Grid item xs={9} sm={9} md={10} lg={10}>
            <CardHeader
              classes={{
                subheader: classes.subheader,
                title: classes.title
              }}
              title={title}
              subheader={description === null ? "No description available..." : description}
            />
            <Grid container className={classes.publishDate} direction="row-reverse">
              <Grid item>
                <Typography variant="caption">
                  {`Published ${since(published)}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </a>
  );
}