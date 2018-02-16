import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { glossaryEditorFetchData, glossaryPatch, glossaryPost } from '../../actions/glossary';
import { EMPTY_FUNCTION, GLOSSARY_LIST, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT } from '../../Constants/PropTypes';
import GlossaryEditor from '../../Components/GlossaryEditor';

class GlossaryEditorContainer extends Component {

  constructor(props) {
    super(props);
    this.submitGlossaryTerm = this.submitGlossaryTerm.bind(this);
    this.submitNewGlossaryTerm = this.submitNewGlossaryTerm.bind(this);
  }

  componentWillMount() {
    const { fetchGlossary } = this.props;
    fetchGlossary();
  }

  submitGlossaryTerm(term) {
    const { submitGlossaryTerm } = this.props;
    submitGlossaryTerm(term);
  }

  submitNewGlossaryTerm(term) {
    const { submitNewGlossaryTerm } = this.props;
    submitNewGlossaryTerm(term);
  }

  render() {
    const { glossaryItems, glossaryIsLoading, glossaryHasErrored,
      glossaryPatchHasErrored, glossaryPatchSuccess, glossaryPostHasErrored,
      glossaryPostSuccess } = this.props;
    return (
      <GlossaryEditor
        glossaryItems={glossaryItems.results}
        glossaryIsLoading={glossaryIsLoading}
        glossaryHasErrored={glossaryHasErrored}
        submitGlossaryTerm={this.submitGlossaryTerm}
        submitNewGlossaryTerm={this.submitNewGlossaryTerm}
        glossaryPatchHasErrored={glossaryPatchHasErrored}
        glossaryPatchSuccess={glossaryPatchSuccess}
        glossaryPostHasErrored={glossaryPostHasErrored}
        glossaryPostSuccess={glossaryPostSuccess}
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
  submitNewGlossaryTerm: PropTypes.func.isRequired,
  glossaryPatchHasErrored: GLOSSARY_ERROR_OBJECT,
  glossaryPatchSuccess: GLOSSARY_SUCCESS_OBJECT,
  glossaryPostHasErrored: PropTypes.bool,
  glossaryPostSuccess: GLOSSARY_SUCCESS_OBJECT,
};

GlossaryEditorContainer.defaultProps = {
  fetchGlossary: EMPTY_FUNCTION,
  glossaryItems: { results: [] },
  glossaryIsLoading: false,
  glossaryHasErrored: false,
  submitGlossaryTerm: EMPTY_FUNCTION,
  submitNewGlossaryTerm: EMPTY_FUNCTION,
  glossaryPatchHasErrored: {},
  glossaryPatchSuccess: {},
  glossaryPostHasErrored: false,
  glossaryPostSuccess: {},
};

const mapStateToProps = state => ({
  shouldShowGlossary: state.shouldShowGlossary,
  glossaryItems: state.glossaryEditor,
  glossaryHasErrored: state.glossaryEditorHasErrored,
  glossaryIsLoading: state.glossaryEditorIsLoading,
  glossaryPatchHasErrored: state.glossaryPatchHasErrored,
  glossaryPatchSuccess: state.glossaryPatchSuccess,
  glossaryPostHasErrored: state.glossaryPostHasErrored,
  glossaryPostSuccess: state.glossaryPostSuccess,
});

export const mapDispatchToProps = dispatch => ({
  fetchGlossary: () => dispatch(glossaryEditorFetchData()),
  submitGlossaryTerm: termObj => dispatch(glossaryPatch(termObj)),
  submitNewGlossaryTerm: termObj => dispatch(glossaryPost(termObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlossaryEditorContainer);
