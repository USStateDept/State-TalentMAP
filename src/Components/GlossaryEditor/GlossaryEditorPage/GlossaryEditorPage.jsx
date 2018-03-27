import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import groupBy from 'lodash/groupBy';
import { GLOSSARY_ARRAY, EMPTY_FUNCTION, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT } from '../../../Constants/PropTypes';
import Spinner from '../../Spinner';
import GlossaryEditorContainer from '../GlossaryEditorContainer';
import TopNav from '../TopNav';
import GlossaryEditorSearch from '../GlossaryEditorSearch';
import { filterByProps } from '../../../utilities';
import GlossaryEditorPageHeader from '../GlossaryEditorPageHeader';
import StaticDevContent from '../../StaticDevContent';

class GlossaryEditorPage extends Component {
  constructor(props) {
    super(props);
    this.debouncedChangeText = this.debouncedChangeText.bind(this);
    this.debouncedChangeLetter = this.debouncedChangeLetter.bind(this);
    this.state = {
      searchText: '',
      firstLetter: null,
      localSearchIsLoading: false,
    };
    // Create an instance attribute for storing a reference to debounced requests
    this.debouncedText = debounce(EMPTY_FUNCTION);
    this.debouncedLetter = debounce(EMPTY_FUNCTION);
    this.debounceTimeMs = 300;
  }

  // Update search text string and set localSearchIsLoading to false.
  changeText(text) {
    this.setState({ searchText: text.q, localSearchIsLoading: false });
  }

  // Update first letter string and set localSearchIsLoading to false.
  // This will be used for filtering by first letter.
  changeFirstLetter(firstLetter) {
    this.setState({ firstLetter, localSearchIsLoading: false });
  }

  // Perform client-side search but apply loading prop to provide
  // a more natural search exprience.
  debouncedChangeText(text) {
    this.setState({ localSearchIsLoading: true });
    this.debouncedText.cancel();
    this.debouncedText = debounce(q => this.changeText(q), this.debounceTimeMs);
    this.debouncedText(text);
  }

  debouncedChangeLetter(letter) {
    this.setState({ localSearchIsLoading: true });
    this.debouncedLetter.cancel();
    this.debouncedLetter = debounce(q => this.changeFirstLetter(q), this.debounceTimeMs);
    this.debouncedLetter(letter);
  }

  filteredTermsBySearch() {
    const { searchText } = this.state;
    const { glossaryItems } = this.props;

    // filter where the keyword matches part of the title or definition
    let filteredTerms = filterByProps(searchText, ['title', 'definition'], glossaryItems);
    filteredTerms = groupBy(filteredTerms, (term) => {
      const first = term.title.substr(0, 1).toUpperCase();
      // check if it's a letter
      const firstIsAlpha = first.match(/^[a-zA-Z]*$/);
      // if so, assign it to its first letter
      if (firstIsAlpha) {
        return first;
      // else, assign it to the '#' prop
      } return '#';
    });
    return filteredTerms;
  }

  filteredTermsBySearchAndGlossary() {
    const { firstLetter } = this.state;

    const filteredTerms = this.filteredTermsBySearch();

    // Keep the same structure as filteredTermsBySearch() by assigning
    // a single letter property to an object.
    if (firstLetter) {
      const filteredObject = {};
      filteredObject[firstLetter] = filteredTerms[firstLetter];
      return filteredObject;
    }

    return filteredTerms;
  }

  render() {
    const {
      glossaryIsLoading,
      glossaryHasErrored,
      submitGlossaryTerm,
      submitNewGlossaryTerm,
      glossaryPatchHasErrored,
      glossaryPatchSuccess,
      glossaryPostHasErrored,
      glossaryPostSuccess,
      onGlossaryEditorCancel,
    } = this.props;

    const { localSearchIsLoading } = this.state;

    const glossaryIsLoadingAsyncOrSync = glossaryIsLoading || localSearchIsLoading;
    const isLoading = glossaryIsLoadingAsyncOrSync && !glossaryHasErrored;

    const filteredGlossary = this.filteredTermsBySearchAndGlossary();
    const availableLetters = Object.keys(filteredGlossary);
    return (
      <div className="bidder-portfolio-page glossary-editor-page">
        <GlossaryEditorPageHeader
          submitNewGlossaryTerm={submitNewGlossaryTerm}
          onGlossaryEditorCancel={onGlossaryEditorCancel}
          glossaryPostHasErrored={glossaryPostHasErrored}
          glossaryPostSuccess={glossaryPostSuccess}
        />
        <GlossaryEditorSearch
          onUpdate={this.debouncedChangeText}
          submitGlossaryTerm={submitGlossaryTerm}
        />
        <div className="usa-grid-full bidder-portfolio-container profile-content-inner-container">
          <StaticDevContent>
            <TopNav />
          </StaticDevContent>
          <div className={`usa-grid-full bidder-portfolio-listing ${isLoading ? 'results-loading' : ''}`}>
            {
              isLoading &&
                <Spinner type="homepage-position-results" size="big" />
            }
            {
              !isLoading &&
                <GlossaryEditorContainer
                  submitGlossaryTerm={submitGlossaryTerm}
                  submitGlossaryFirstLetter={this.debouncedChangeLetter}
                  glossaryItems={filteredGlossary}
                  availableLetters={availableLetters}
                  glossaryPatchHasErrored={glossaryPatchHasErrored}
                  glossaryPatchSuccess={glossaryPatchSuccess}
                  onGlossaryEditorCancel={onGlossaryEditorCancel}
                />
            }
          </div>
        </div>
      </div>
    );
  }
}

GlossaryEditorPage.propTypes = {
  glossaryIsLoading: PropTypes.bool.isRequired,
  glossaryHasErrored: PropTypes.bool.isRequired,
  glossaryItems: GLOSSARY_ARRAY.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
  submitNewGlossaryTerm: PropTypes.func.isRequired,
  glossaryPatchHasErrored: GLOSSARY_ERROR_OBJECT,
  glossaryPatchSuccess: GLOSSARY_SUCCESS_OBJECT,
  glossaryPostHasErrored: GLOSSARY_ERROR_OBJECT,
  glossaryPostSuccess: GLOSSARY_SUCCESS_OBJECT,
  onGlossaryEditorCancel: PropTypes.func,
};

GlossaryEditorPage.defaultProps = {
  glossaryPatchHasErrored: {},
  glossaryPatchSuccess: {},
  glossaryPostHasErrored: {},
  glossaryPostSuccess: {},
  onGlossaryEditorCancel: EMPTY_FUNCTION,
};

export default GlossaryEditorPage;
