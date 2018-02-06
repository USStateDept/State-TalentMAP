import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { glossaryFetchData } from '../../actions/glossary';
import { EMPTY_FUNCTION, GLOSSARY_LIST } from '../../Constants/PropTypes';
import GlossaryEditor from '../../Components/GlossaryEditor';

class GlossaryEditorContainer extends Component {

  constructor(props) {
    super(props);
    this.submitGlossaryTerm = this.submitGlossaryTerm.bind(this);
  }

  componentWillMount() {
    const { fetchGlossary } = this.props;
    fetchGlossary();
  }

  submitGlossaryTerm(term) {
    const { submitGlossaryTerm } = this.props;
    // TODO - create action and integrate with API once its implemented
    submitGlossaryTerm(term);
  }

  render() {
    const { glossaryItems, glossaryIsLoading, glossaryHasErrored } = this.props;
    return (
      <GlossaryEditor
        glossaryItems={glossaryItems.results}
        glossaryIsLoading={glossaryIsLoading}
        glossaryHasErrored={glossaryHasErrored}
        submitGlossaryTerm={this.submitGlossaryTerm}
      />
    );
  }
}

GlossaryEditorContainer.propTypes = {
  fetchGlossary: PropTypes.func.isRequired,
  glossaryItems: GLOSSARY_LIST.isRequired,
  glossaryIsLoading: PropTypes.bool,
  glossaryHasErrored: PropTypes.bool,
  submitGlossaryTerm: PropTypes.func.isRequired,
};

GlossaryEditorContainer.defaultProps = {
  fetchGlossary: EMPTY_FUNCTION,
  glossaryItems: { results: [] },
  glossaryIsLoading: false,
  glossaryHasErrored: false,
  submitGlossaryTerm: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  shouldShowGlossary: state.shouldShowGlossary,
  glossaryItems: state.glossary,
  glossaryHasErrored: state.glossaryHasErrored,
  glossaryIsLoading: state.glossaryIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchGlossary: () => dispatch(glossaryFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryEditorContainer);
