import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MarkdownEditor } from 'react-markdown-editor';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import TextEditorSubmit from '../../TextEditorSubmit';

export const SUBMIT_BUTTON_ID = 'about-content-submit';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      data: props.data,
    };
  }

  submit() {
    const { data } = this.state;
    this.props.submit(data);
  }

  render() {
    const { cancel, data } = this.props;
    return (
      <div className="usa-grid-full">
        <TextEditorSubmit
          cancel={cancel}
          submit={this.submit}
          submitProps={{ id: SUBMIT_BUTTON_ID }}
        />
        <div className="usa-grid-full markdown-editor">
          <MarkdownEditor
            onContentChange={s => this.setState({ data: s })}
            styles={{
              styleMarkdownPreviewArea: { overflow: 'auto' },
              styleMarkdownTextArea: { paddingTop: '10px' },
            }}
            initialContent={data}
            iconsSet="font-awesome"
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  data: PropTypes.string,
  cancel: PropTypes.func,
  submit: PropTypes.func,
};

Editor.defaultProps = {
  data: '',
  cancel: EMPTY_FUNCTION,
  submit: EMPTY_FUNCTION,
};

export default Editor;
