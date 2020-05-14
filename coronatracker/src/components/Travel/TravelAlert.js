import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  root: {
    background: "#373B52",
    color: "#3BBA9C"
  },
  content: {
    padding: "2px 16px 16px 16px"
  },
  listItemText: {
    color: "#7DB3A6"
  },
  header: {
    padding: "16px 16px 2px 16px"
  },
  cardFooter: {
    padding: 10
  },
  subheader: {
    color: "#3BBA9C",
    fontSize: "0.85em"
  },
  title: {
    color: "#3BBA9C",
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: 5
  }
});

export default function TravelAlert(props) {
  const { country, data } = props;
  const { description, published } = data;
  const subheader = published === null ? null : `Last updated: ${published}`;

  const classes = useStyle();

  return (
    <Grid container direction="column">
      <Grid item>
        <Card className={classes.root} >
          <CardHeader
            classes={{
              root: classes.header,
              subheader: classes.subheader,
              title: classes.title
            }}
            title={`Travel Alert for ${country}`}
            subheader={subheader}
          />
          <CardContent className={classes.content}>
            <List dense>
              {
                description.split("\n").map((line, i) => (
                  <ListItem key={i}>
                    <ListItemText className={classes.listItemText} primary={line} />
                  </ListItem>
                ))
              }
            </List>
          </CardContent>
          <Grid container className={classes.cardFooter} direction="row-reverse">
            <Grid item>
              <Typography variant="caption">
                Provided by <Link href="https://www.iatatravelcentre.com/international-travel-document-news/1580226297.htm">IATA</Link>
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}