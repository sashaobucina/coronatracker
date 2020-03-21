import React, { Component } from 'react';
import '../style/App.css';
import axios from "axios";
import AutoComplete from './AutoComplete';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      validCountries: []
    };

    /* Bindings */
    this.prefetchData = this.prefetchData.bind(this);
  };

  prefetchData() {
    const url = "http://localhost:5000/valid-countries";
    axios.get(url).then(res => {
      this.setState({
        validCountries: res.data
      })
    }).catch(err => {
      console.error(err);
    })
  };

  componentDidMount() {
    this.prefetchData();
  };

  render() {
    const { validCountries } = this.state
    return (
      <div className="root-app">
        <AutoComplete suggestions={validCountries} />
      </div>
    )
  };
}

export default App;
