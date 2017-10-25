import React, { Component } from 'react';
import AutoSuggestComponent from 'react-autosuggest';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import RenderSuggestion from './RenderSuggestion';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Configure our debounced function.
// It needs to be global so we can cancel any pending requests while the user types.
let debounced = debounce(() => {});

export default class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onKeyChange(event, { newValue }) {
    this.setState({
      // If the user is typing, then newValue is a string,
      // but if the user is arrowing through suggestions, then newValue is an object.
      value: newValue[this.props.displayProperty] ? newValue[this.props.displayProperty] : newValue,
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested({ value }) {
    debounced.cancel();
    debounced = debounce(q => this.props.getSuggestions(q), this.props.debounce);
    debounced(value);
  }

  // when a suggestion is actually selected
  onSuggestionSelected(event, { suggestion }) {
    this.props.onSuggestionSelected(
      this.props.queryProperty.length ? suggestion[this.props.queryProperty] : suggestion,
    );
  }

  // Use your imagination to render suggestions.
  renderSuggestion(suggestion) {
    const Template = this.props.suggestionTemplate;
    return <Template suggestion={suggestion} />;
  }

  render() {
    const { value } = this.state;
    const { placeholder, suggestions, onSuggestionsClearRequested } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder,
      value,
      onChange: this.onKeyChange,
    };

    // Finally, render it.
    return (
      <AutoSuggestComponent
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

AutoSuggest.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  placeholder: PropTypes.string,
  getSuggestions: PropTypes.func.isRequired,
  debounce: PropTypes.number, // Number in milliseconds to debounce typing.
  onSuggestionSelected: PropTypes.func.isRequired,

  // This is required by the AutoSuggest component, but is not necessary for our use.
  onSuggestionsClearRequested: PropTypes.func,

  // Which property should show up in the text input when a suggestion is chosen?
  displayProperty: PropTypes.string,

  // Which property should be sent back when onSuggestionSelected is called?
  // If none is delcared, the entire suggestion object is returned.
  queryProperty: PropTypes.string,

  // the template to use for rendering suggestions
  suggestionTemplate: PropTypes.node,
};

AutoSuggest.defaultProps = {
  suggestions: [],
  placeholder: '',
  debounce: 350,
  onSuggestionsClearRequested: EMPTY_FUNCTION,
  displayProperty: 'short_name',
  queryProperty: '',
  suggestionTemplate: RenderSuggestion,
};
