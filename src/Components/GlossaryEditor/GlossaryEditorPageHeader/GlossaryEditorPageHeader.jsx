import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT } from '../../../Constants/PropTypes';
import GlossaryEditorCard from '../GlossaryEditorCard';
import Alert from '../../Alert';

class GlossaryEditorPage extends Component {
  constructor(props) {
    super(props);
    this.toggleNewTermEditor = this.toggleNewTermEditor.bind(this);
    this.state = {
      showNewTerm: false,
    };
  }

  toggleNewTermEditor() {
    this.props.onGlossaryEditorCancel(null);
    this.setState({ showNewTerm: !this.state.showNewTerm });
  }

  render() {
    const { submitNewGlossaryTerm, glossaryPostHasErrored, glossaryPostSuccess } = this.props;
    const { showNewTerm } = this.state;

    const postHasSucceeded = !glossaryPostHasErrored.hasErrored && glossaryPostSuccess.success;
    const showPostSuccess = postHasSucceeded && !showNewTerm;

    return (
      <div className="profile-content-inner-container glossary-editor-page-header">
        <div className="usa-grid-full">
          <div className="usa-width-five-sixths hello-greeting">
            Glossary Editor
          </div>
          <div className="usa-width-one-sixth create-term-container">
            <button onClick={this.toggleNewTermEditor}>Create term</button>
          </div>
        </div>
        {
          showPostSuccess && <Alert type="success" title="Success" messages={[{ body: 'Successfully added term!' }]} />
        }
        {
          showNewTerm &&
            <div className="usa-grid-full editor-container">
              <div className="usa-width-one-whole glossary-editor-card-container">
                <GlossaryEditorCard
                  term={{}}
                  isNewTerm
                  submitGlossaryTerm={submitNewGlossaryTerm}
                  onCancel={this.toggleNewTermEditor}
                  hasErrored={glossaryPostHasErrored}
                />
              </div>
            </div>
        }
      </div>
    );
  }
}

GlossaryEditorPage.propTypes = {
  submitNewGlossaryTerm: PropTypes.func.isRequired,
  onGlossaryEditorCancel: PropTypes.func,
  glossaryPostHasErrored: GLOSSARY_ERROR_OBJECT,
  glossaryPostSuccess: GLOSSARY_SUCCESS_OBJECT,
};

GlossaryEditorPage.defaultProps = {
  onGlossaryEditorCancel: EMPTY_FUNCTION,
  glossaryPostHasErrored: {},
  glossaryPostSuccess: {},
};

export default GlossaryEditorPage;
