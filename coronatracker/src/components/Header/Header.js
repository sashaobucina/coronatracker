import React from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Search, InfoOutlined, TrendingUp, Public } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  navigation : {
    background: '#3C3F58',
    color: '#3BBA9C',
    width: '100%',
    position: 'absolute',
    top: 0,
    opacity: 0.95,
    zIndex: 9999
  },
  navigationAction: {
    color: '#12131C',
    "&:hover": {
      color: '#3BBA9C',
      opacity: 0.9
    },
    "&.Mui-selected": {
      color: '#3BBA9C',
    }
  }
});

const paths = [
  "/",
  "/top-movers",
  "/heatmap",
  "/faqs"
]

export default function Header(props) {
  const { path, updatePath } = props;
  const classes = useStyles();

  const handleChange = (_, newValue) => {
    updatePath(newValue);
  }

  return (
    <BottomNavigation
      className={classes.navigation}
      value={paths.indexOf(path)}
      showLabels
      onChange={handleChange}
    >
      <BottomNavigationAction 
        className={classes.navigationAction}
        label="Search"
        icon={<Search />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        className={classes.navigationAction}
        label="Top Movers"
        icon={<TrendingUp />}
        component={Link}
        to="/top-movers"
      />
      <BottomNavigationAction
        className={classes.navigationAction}
        label="Heat Map"
        icon={<Public />}
        component={Link}
        to="/heatmap"
      />
      <BottomNavigationAction
        className={classes.navigationAction}
        label="FAQs"
        icon={<InfoOutlined />}
        component={Link}
        to="/faqs"
      />
    </BottomNavigation>
  );
}