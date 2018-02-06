import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GLOSSARY_OBJECT } from '../../../Constants/PropTypes';
import TextEditor from '../../TextEditor';
import InteractiveElement from '../../InteractiveElement';

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
      this.setState({ editorHidden: true });
    } else {
      this.setState(
        { displayZeroLengthAlert: { title: newTitleIsEmpty, definition: newDefinitionIsEmpty } },
      );
    }
  }

  render() {
    const { term } = this.props;
    const { editorHidden, newTitle, newDefinition, displayZeroLengthAlert } = this.state;

    const renderedTitle = newTitle || term.title;
    const renderedDefinition = newDefinition || term.definition;

    const editorHiddenClass = editorHidden ? 'editor-hidden' : 'editor-visible';
    const definitionContainerClass = editorHidden ? 'editor-hidden--definition' : 'editor-visible--definition';
    const titleContainerClass = editorHidden ? 'editor-hidden--title' : 'editor-visible--title';

    const emptyTitleWarning = displayZeroLengthAlert.title;
    const emptyDefinitionWarning = displayZeroLengthAlert.definition;
    const showEmptyWarning = emptyTitleWarning || emptyDefinitionWarning;
    return (
      <div className="usa-grid-full section-padded-inner-container glossary-editor-card">
        <div className="usa-grid-full glossary-editor-card-top">
          <div className={`title-container ${editorHiddenClass} ${titleContainerClass}`}>
            {
              editorHidden ?
              renderedTitle :
              <TextEditor
                initialText={renderedTitle}
                onSubmitText={this.submitDefinition}
                cancel={this.cancel}
                hideButtons
                onChangeText={this.updateTitle}
              />
            }
          </div>
          <div className="actions-container">
            <div className="actions-inner-container">
              <div>History</div>
              <InteractiveElement role="link" onClick={this.toggleEditorState}>{editorHidden ? 'Edit' : 'Cancel'}</InteractiveElement>
            </div>
          </div>
        </div>
        <div className={`usa-grid-full glossary-editor-card-definition ${editorHiddenClass} ${definitionContainerClass}`}>
          {
            editorHidden ?
            renderedDefinition :
            <TextEditor
              id="input-error"
              initialText={renderedDefinition}
              onSubmitText={this.submitDefinition}
              cancel={this.cancel}
              onChangeText={this.updateDefinition}
              draftJsProps={{ ariaDescribedBy: 'input-error-message' }}
            />
          }
          {
            showEmptyWarning &&
            <div>
              <span className="usa-input-error-message" role="alert">Title or definition cannot be blank</span>
            </div>
          }
        </div>
        <div className="usa-grid-full glossary-editor-card-bottom">
          Updated on 7.11.17 | Editor: John Doe
        </div>
      </div>
    );
  }
}

GlossaryEditorCard.propTypes = {
  term: GLOSSARY_OBJECT.isRequired,
  submitGlossaryTerm: PropTypes.func.isRequired,
};

export default GlossaryEditorCard;
