import React, { Component } from 'react';
import AutoSuggestComponent from 'react-autosuggest';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import SuggestionChoice from './SuggestionChoice';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';
import getSuggestionValue from './helpers';

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

    // Configure our debounce function.
    // It needs to be global so we can cancel any pending requests while the user types.
    this.debounced = debounce(() => {});
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
    this.debounced.cancel();
    this.debounced = debounce(q => this.props.getSuggestions(q), this.props.debounce);
    this.debounced(value);
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
    const { placeholder, suggestions, onSuggestionsClearRequested, id,
      customInputProps, inputId, label, labelSrOnly } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder,
      value,
      onChange: this.onKeyChange,
      id: inputId,
      ...customInputProps,
    };

    // Finally, render it.
    return (
      <div className="usa-grid-full">
        <label htmlFor={inputId} className={labelSrOnly ? 'usa-sr-only' : undefined}>{label}</label>
        <AutoSuggestComponent
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          id={id}
        />
      </div>
    );
  }
}

AutoSuggest.propTypes = {
  // use an id when there are multiple AutoSuggest components on a single view
  id: PropTypes.string,

  customInputProps: PropTypes.shape({
    // Pass any other arbitrary props to the input element in this object.
    // The "placholder" and "inputId" props (see below) will eventually get
    // passed to this object, but we explicitly
    // declare them as props since they're more commonly used.
    // Any duplicated props in this object will overwrite the others.
    // https://github.com/moroshko/react-autosuggest#inputprops-required
  }),

  suggestions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  placeholder: PropTypes.string,

  // We should always add an input id for accessibility.
  inputId: PropTypes.string.isRequired,
  // Additionally, we should always an associated label for accessibility.
  label: PropTypes.string.isRequired,
  // ...but we can make that label srOnly if we want. It will default to true.
  labelSrOnly: PropTypes.bool,

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
  suggestionTemplate: PropTypes.func,
};

AutoSuggest.defaultProps = {
  id: undefined,
  customInputProps: {},
  suggestions: [],
  placeholder: '',
  labelSrOnly: true,
  debounce: 350,
  onSuggestionsClearRequested: EMPTY_FUNCTION,
  displayProperty: 'short_name',
  queryProperty: '',
  suggestionTemplate: SuggestionChoice,
};
