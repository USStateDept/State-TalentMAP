import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { ifEnter } from '../../utilities';
import * as SystemMessages from '../../Constants/SystemMessages';
import * as PROP_TYPES from '../../Constants/PropTypes';
import TextEditor from '../TextEditor';
import Alert from '../Alert/Alert';

class PositionAdditionalDetails extends Component {
  constructor(props) {
    super(props);
    this.toggleDescriptionEditor = this.toggleDescriptionEditor.bind(this);
    this.submitDescriptionEdit = this.submitDescriptionEdit.bind(this);
    this.state = {
      shouldShowDescriptionEditor: { value: false },
    };
  }

  componentWillUnmount() {
    // reset any alert messages on unmount
    this.props.resetDescriptionEditMessages();
  }

  toggleDescriptionEditor() {
    // reset any alert messages
    this.props.resetDescriptionEditMessages();
    const { shouldShowDescriptionEditor } = this.state;
    shouldShowDescriptionEditor.value = !shouldShowDescriptionEditor.value;
    this.setState({ shouldShowDescriptionEditor });
  }

  submitDescriptionEdit(content) {
    this.props.editDescriptionContent(content);
    this.toggleDescriptionEditor();
  }

  render() {
    const { content, descriptionEditHasErrored,
      descriptionEditIsLoading, descriptionEditSuccess } = this.props;
    const { shouldShowDescriptionEditor } = this.state;

    const showError = !descriptionEditIsLoading && !descriptionEditSuccess
        && descriptionEditHasErrored;
    const showSuccess = !descriptionEditIsLoading && descriptionEditSuccess
        && !descriptionEditHasErrored;
    const showAlert = () => {
      if (showError) {
        return (
          <Alert
            type="error"
            title="Error"
            messages={[{ body: descriptionEditHasErrored }]}
          />
        );
      } else if (showSuccess) {
        return (
          <Alert
            type="success"
            title="Success"
            messages={[{ body: 'Successfully updated description.' }]}
          />
        );
      }
      return null;
    };
    return (
      <div className="usa-grid position-details-additional">
        <div className="usa-width-two-thirds">
          <div className="usa-grid-full">
            <div className="position-details-additional-body">
              <span className="title">
                About
                {
                  !shouldShowDescriptionEditor.value &&
                  <span className="usa-grid-full editable-position-field">
                    <FontAwesome
                      tabIndex="0"
                      onKeyUp={(e) => { if (ifEnter(e)) { this.toggleDescriptionEditor(); } }}
                      onClick={this.toggleDescriptionEditor}
                      name="pencil"
                    />
                  </span>
                }
              </span>
              <TextEditor
                initialText={content}
                onSubmitText={this.submitDescriptionEdit}
                cancel={this.toggleDescriptionEditor}
                readOnly={!shouldShowDescriptionEditor.value}
              />
              <div className="usa-grid-full">
                {
                  !shouldShowDescriptionEditor.value && !content.length ?
                  SystemMessages.NO_POSITION_DESCRIPTION :
                  null
                }
              </div>
              <div className="edit-description-alert-container">
                {showAlert()}
              </div>
            </div>
          </div>
        </div>
        <div className="usa-width-one-third">
          <div className="map-container">
            <img src="/assets/img/map.png" alt="Map of nearby area" />
            <span className="map-title">Map location here</span>
          </div>
        </div>
      </div>
    );
  }
}

PositionAdditionalDetails.propTypes = {
  content: PropTypes.string.isRequired,
  editDescriptionContent: PropTypes.func,
  descriptionEditHasErrored: PropTypes.bool.isRequired,
  descriptionEditIsLoading: PropTypes.bool.isRequired,
  descriptionEditSuccess: PropTypes.bool.isRequired,
  resetDescriptionEditMessages: PropTypes.func.isRequired,
};

PositionAdditionalDetails.defaultProps = {
  content: '',
  editDescriptionContent: PROP_TYPES.EMPTY_FUNCTION,
};

export default PositionAdditionalDetails;
