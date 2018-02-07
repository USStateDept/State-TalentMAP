import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GLOSSARY_OBJECT, EMPTY_FUNCTION, GLOSSARY_ERROR_OBJECT, GLOSSARY_SUCCESS_OBJECT } from '../../../Constants/PropTypes';
import TextEditor from '../../TextEditor';
import InteractiveElement from '../../InteractiveElement';
import { formatDate } from '../../../utilities';

class GlossaryEditorCard extends Component {
  constructor(props) {
    super(props);
    this.toggleEditorState = this.toggleEditorState.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDefinition = this.updateDefinition.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submitDefinition = this.submitDefinition.bind(this);
    this.state = {
      editorHidden: true,
      newTitle: null,
      newTitleWasEdited: false,
      newDefinition: null,
      newDefinitionWasEdited: false,
      displayZeroLengthAlert: false,
    };
  }

  toggleEditorState() {
    this.setState({ editorHidden: !this.state.editorHidden, displayZeroLengthAlert: false });
  }

  updateTitle(newTitle) {
    this.setState({ newTitle, newTitleWasEdited: true, displayZeroLengthAlert: false });
  }

  updateDefinition(newDefinition) {
    this.setState({ newDefinition, newDefinitionWasEdited: true, displayZeroLengthAlert: false });
  }

  cancel() {
    this.props.onCancel();
    this.setState({
      editorHidden: true,
      newTitle: null,
      newDefinition: null,
      newDefinitionWasEdited: false,
      newTitleWasEdited: false,
      displayZeroLengthAlert: false,
    });
  }

  submitDefinition() {
    const { term } = this.props;
    const { newTitle, newDefinition, newDefinitionWasEdited, newTitleWasEdited } = this.state;

    const newTitleIsEmpty = newTitleWasEdited && !newTitle;
    const newDefinitionIsEmpty = newDefinitionWasEdited && !newDefinition;

    const title = newTitle || term.title;
    const definition = newDefinition || term.definition;

    // Check if there's a title and definition, as well as if either the
    // title or definition are present but not changed via the text editor.
    if (title && definition && !newTitleIsEmpty && !newDefinitionIsEmpty) {
      this.props.submitGlossaryTerm({
        id: term.id,
        title,
        definition,
      });
      // reset state values after submitting
      this.cancel();
    } else {
      this.setState(
        { displayZeroLengthAlert: { title: newTitleIsEmpty, definition: newDefinitionIsEmpty } },
      );
    }
  }

  render() {
    const { term, isNewTerm, hasErrored, success } = this.props;
    const { editorHidden, newTitle, newDefinition, displayZeroLengthAlert } = this.state;

    const date = term.date_updated ? formatDate(term.date_updated) : false;
    const dateString = date ? `Updated on ${date}` : 'Date updated unknown';

    const renderedTitle = newTitle || term.title;
    const renderedDefinition = newDefinition || term.definition;

    const showResponseError = hasErrored.hasErrored && hasErrored.id === term.id;
    const showSuccessMessage = success.success && success.id === term.id;

    const shouldHideEditor = editorHidden && !isNewTerm;
    const editorHiddenClass = shouldHideEditor ? 'editor-hidden' : 'editor-visible';
    const definitionContainerClass = shouldHideEditor ? 'editor-hidden--definition' : 'editor-visible--definition';
    const titleContainerClass = shouldHideEditor ? 'editor-hidden--title' : 'editor-visible--title';

    const emptyTitleWarning = displayZeroLengthAlert.title;
    const emptyDefinitionWarning = displayZeroLengthAlert.definition;
    const showEmptyWarning = emptyTitleWarning || emptyDefinitionWarning;
    return (
      <div className="usa-grid-full section-padded-inner-container glossary-editor-card">
        <div className="usa-grid-full glossary-editor-card-top">
          <div className={`title-container ${editorHiddenClass} ${titleContainerClass}`}>
            {
              shouldHideEditor ?
              renderedTitle :
              <TextEditor
                initialText={renderedTitle}
                onSubmitText={this.submitDefinition}
                cancel={this.cancel}
                hideButtons
                onChangeText={this.updateTitle}
                draftJsProps={{ placeholder: 'Title' }}
              />
            }
          </div>
          {
            !isNewTerm &&
              <div className="actions-container">
                <div className="actions-inner-container">
                  <div>History</div>
                  <InteractiveElement role="link" onClick={this.toggleEditorState}>{shouldHideEditor ? 'Edit' : 'Cancel'}</InteractiveElement>
                </div>
              </div>
          }
        </div>
        <div className={`usa-grid-full glossary-editor-card-definition ${editorHiddenClass} ${definitionContainerClass}`}>
          {
            shouldHideEditor ?
            renderedDefinition :
            <TextEditor
              id="input-error"
              initialText={renderedDefinition}
              onSubmitText={this.submitDefinition}
              cancel={this.cancel}
              onChangeText={this.updateDefinition}
              draftJsProps={{ placeholder: 'Definition' }}
            />
          }
        </div>
        {
          <div className="usa-grid-full">
            {
              showEmptyWarning &&
                <span className="usa-input-error-message" role="alert">Title and definition cannot be blank.</span>
            }
            {
              showResponseError &&
                <span className="usa-input-error-message" role="alert">Error updating term.</span>
            }
            {
              showSuccessMessage &&
                <span role="alert">Updated term successfully.</span>
            }
          </div>
        }
        {
          !isNewTerm &&
            <div className="usa-grid-full glossary-editor-card-bottom">
              {dateString} | Editor: {term.last_editing_user || 'None listed'}
            </div>
        }
      </div>
    );
  }
}

GlossaryEditorCard.propTypes = {
  term: GLOSSARY_OBJECT.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
  isNewTerm: PropTypes.bool,
  onCancel: PropTypes.func,
  hasErrored: PropTypes.oneOfType([GLOSSARY_ERROR_OBJECT, PropTypes.bool]),
  success: GLOSSARY_SUCCESS_OBJECT,
};

GlossaryEditorCard.defaultProps = {
  isNewTerm: false,
  onCancel: EMPTY_FUNCTION,
  hasErrored: {},
  success: {},
};

export default GlossaryEditorCard;
