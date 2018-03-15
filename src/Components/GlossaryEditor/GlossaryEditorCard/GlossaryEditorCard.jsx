import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GLOSSARY_OBJECT, EMPTY_FUNCTION, GLOSSARY_ERROR_OBJECT } from '../../../Constants/PropTypes';
import TextEditor from '../../TextEditor';
import InteractiveElement from '../../InteractiveElement';
import GlossaryEditorCardBottom from '../GlossaryEditorCardBottom';
import StaticDevContent from '../../StaticDevContent';

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
      newIsArchived: this.props.term.is_archived || false,
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
    this.props.onCancel(this.props.term.id);
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
    const { newTitle, newDefinition, newDefinitionWasEdited, newTitleWasEdited,
      newIsArchived } = this.state;

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
        is_archived: newIsArchived,
      }, () => {
        // reset state values on success
        this.cancel();
      });
    } else {
      this.setState(
        { displayZeroLengthAlert: { title: newTitleIsEmpty, definition: newDefinitionIsEmpty } },
      );
    }
  }

  render() {
    const { term, isNewTerm, hasErrored, submitGlossaryTerm } = this.props;
    const {
      editorHidden,
      newTitle,
      newDefinition,
      displayZeroLengthAlert,
    } = this.state;

    const renderedTitle = newTitle || term.title;
    const renderedDefinition = newDefinition || term.definition;

    const shouldHideEditor = editorHidden && !isNewTerm;
    const editorHiddenClass = shouldHideEditor ? 'editor-hidden' : 'editor-visible';
    const editorContainerHiddenClass = shouldHideEditor ? 'editor-container-hidden' : 'editor-container-visible';
    const definitionContainerClass = shouldHideEditor ? 'editor-hidden--definition' : 'editor-visible--definition';
    const titleContainerClass = shouldHideEditor ? 'editor-hidden--title' : 'editor-visible--title';

    const emptyTitleWarning = displayZeroLengthAlert.title;
    const emptyDefinitionWarning = displayZeroLengthAlert.definition;
    const showEmptyWarning = emptyTitleWarning || emptyDefinitionWarning;

    return (
      <div className={`usa-grid-full section-padded-inner-container glossary-editor-card ${editorContainerHiddenClass}`}>
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
                  <StaticDevContent>
                    <div>History</div>
                  </StaticDevContent>
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
        <GlossaryEditorCardBottom
          isNewTerm={isNewTerm}
          hasErrored={hasErrored}
          showEmptyWarning={showEmptyWarning}
          dateUpdated={term.date_updated}
          updatedBy={term.last_editing_user}
          isArchived={term.is_archived}
          id={term.id || null}
          submitGlossaryTerm={submitGlossaryTerm}
        />
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
};

GlossaryEditorCard.defaultProps = {
  isNewTerm: false,
  onCancel: EMPTY_FUNCTION,
  onSuccess: {},
  hasErrored: false,
};

export default GlossaryEditorCard;
