import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GLOSSARY_OBJECT, EMPTY_FUNCTION, GLOSSARY_ERROR_OBJECT } from '../../../Constants/PropTypes';
import TextEditor from '../../TextEditor';
import InteractiveElement from '../../InteractiveElement';
import GlossaryEditorCardBottom from '../GlossaryEditorCardBottom';
import StaticDevContent from '../../StaticDevContent';

const isEmpty = value => (value || '').length === 0;

class GlossaryEditorCard extends Component {
  constructor(props) {
    super(props);

    this.toggleEditorState = this.toggleEditorState.bind(this);
    this.toggleEmptyAlert = this.toggleEmptyAlert.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDefinition = this.updateDefinition.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submitDefinition = this.submitDefinition.bind(this);

    this.state = {
      editorHidden: true,
      newTitle: null,
      newDefinition: null,
      displayZeroLengthAlert: false,
      newIsArchived: this.props.term.is_archived || false,
    };
  }

  get hasTitleChanged() {
    const { term } = this.props;
    return (this.state.newTitle !== null) && (term.title !== this.state.newTitle);
  }

  get hasDefinitionChanged() {
    const { term } = this.props;
    return (this.state.newDefinition !== null) && (term.definition !== this.state.newDefinition);
  }

  get hasChanged() {
    return (this.hasTitleChanged || this.hasDefinitionChanged);
  }

  get valid() {
    const { newTitle, newDefinition } = this.state;
    // Check if there's a title and definition, as well as if either the
    // title or definition are present but not changed via the text editor.
    return !isEmpty(newTitle) && !isEmpty(newDefinition);
  }

  toggleEditorState() {
    this.setState({ editorHidden: !this.state.editorHidden, displayZeroLengthAlert: false });
  }

  toggleEmptyAlert(displayZeroLengthAlert = true) {
    this.setState({ displayZeroLengthAlert });
  }

  updateTitle(newTitle) {
    this.setState({ newTitle });
    this.toggleEmptyAlert(false);
  }

  updateDefinition(newDefinition) {
    this.setState({ newDefinition });
    this.toggleEmptyAlert(false);
  }

  cancel() {
    this.props.onCancel(this.props.term.id);
    this.setState({
      editorHidden: true,
      newTitle: null,
      newDefinition: null,
      displayZeroLengthAlert: false,
    });
  }

  submitDefinition() {
    const { term, isNewTerm } = this.props;
    const { newTitle, newDefinition, newIsArchived } = this.state;

    if (this.valid) {
      if (this.hasChanged) {
        this.props.submitGlossaryTerm({
          id: term.id,
          title: newTitle,
          definition: newDefinition,
          is_archived: newIsArchived,
        }, () => {
          // Toggle submitted state on success
          this.setState({ editorHidden: true });

          if (isNewTerm) {
            this.props.onCancel();
          }
        });
      } else {
        // No changes made so it's fine to use our cancel fn
        this.cancel();
      }
    } else {
      this.toggleEmptyAlert({
        title: isEmpty(newTitle),
        definition: isEmpty(newDefinition),
      });
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
