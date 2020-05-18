import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, SvgIcon } from "@material-ui/core";
import { Search, DateRange, TrendingUp, Public } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { AppContext } from "../App";

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
    padding: 0,
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
  "/peak-data",
  "/heatmap",
  "/news"
]

function NewsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M 24 7.152344 L 20.832031 6.523438 L 20.832031 0.734375 L 3.167969 0.734375 L 3.167969 6.523438 L 0 7.152344 L 2.464844 19.550781 L 2.464844 23.265625 L 21.535156 23.265625 L 21.535156 19.550781 Z M 21.535156 12.347656 L 21.535156 9.445312 L 19.179688 9.445312 L 18.804688 7.554688 L 22.347656 8.257812 Z M 4.574219 2.140625 L 19.425781 2.140625 L 19.425781 6.242188 L 18.507812 6.0625 L 18.011719 3.570312 L 4.574219 6.242188 Z M 1.652344 8.257812 L 16.90625 5.222656 L 17.746094 9.445312 L 2.464844 9.445312 L 2.464844 12.347656 Z M 20.128906 21.859375 L 3.871094 21.859375 L 3.871094 10.851562 L 20.128906 10.851562 Z M 20.128906 21.859375 "/>
      <path d="M 9.375 20.457031 C 11.636719 20.457031 13.476562 18.617188 13.476562 16.355469 L 13.476562 15.652344 L 9.375 15.652344 L 9.375 17.058594 L 11.976562 17.058594 C 11.667969 18.203125 10.617188 19.050781 9.375 19.050781 C 7.890625 19.050781 6.683594 17.839844 6.683594 16.355469 C 6.683594 14.871094 7.890625 13.664062 9.375 13.664062 C 10.070312 13.664062 10.730469 13.925781 11.234375 14.40625 L 12.203125 13.386719 C 11.4375 12.660156 10.433594 12.257812 9.375 12.257812 C 7.117188 12.257812 5.277344 14.09375 5.277344 16.355469 C 5.277344 18.617188 7.117188 20.457031 9.375 20.457031 Z M 9.375 20.457031 "/>
      <path d="M 14.882812 12.84375 L 18.722656 12.84375 L 18.722656 14.246094 L 14.882812 14.246094 Z M 14.882812 12.84375 "/>
      <path d="M 14.882812 15.652344 L 18.722656 15.652344 L 18.722656 17.058594 L 14.882812 17.058594 Z M 14.882812 15.652344 "/>
      <path d="M 14.882812 18.464844 L 18.722656 18.464844 L 18.722656 19.871094 L 14.882812 19.871094 Z M 14.882812 18.464844 "/>
    </SvgIcon>
  );
}

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const { path } = state;
  const classes = useStyles();

  const handleChange = (_, newValue) => {
    dispatch({ type: "update-path", payload: paths[newValue] });
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
        label="Movers"
        icon={<TrendingUp />}
        component={Link}
        to="/top-movers"
      />
      <BottomNavigationAction
        className={classes.navigationAction}
        label="Peak"
        icon={<DateRange />}
        component={Link}
        to="/peak-data"
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
        label="News"
        icon={<NewsIcon />}
        component={Link}
        to="/news"
      />
    </BottomNavigation>
  );
}