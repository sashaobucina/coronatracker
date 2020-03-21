import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import '../style/AutoComplete.css';

class AutoComplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  }

  static defaultProps = {
    suggestions: []
  }

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };

    /* Bindings */
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  };

  /* Event fired when input value changed */
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value

    // Filter our suggestions that dont contain user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  /* Event fired after user clicks on a suggestion */
  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // user pressed enter key, update input and close suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }

    // user pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }

    // user pressed down arrow key, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 })
    }
  }

  render() {
    const { 
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      userInput
    } = this.state;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={this.onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="search"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder={"Search for a country..."}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    )
  };
}

export default AutoComplete;