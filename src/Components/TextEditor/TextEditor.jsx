/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { stateToMarkdown } from 'draft-js-export-markdown'; // eslint-disable-line

const text = 'The toolbar above the editor can be used for formatting text, as in conventional static editors  …';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText(text),
    };

    this.onChange = (editorState) => {
      this.setState({
        editorState,
      });
    };

    this.focus = () => {
      this.editor.focus();
    };

    this.show = () => {
      console.log({ blah: stateToMarkdown(this.state.editorState.getCurrentContent()) }); // eslint-disable-line
    };
  }

  render() {
    const { readOnly } = this.props;
    return (
      <div>
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref={(element) => { this.editor = element; }}
            readOnly={readOnly}
          />
          <button onClick={() => this.show()} />
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  readOnly: PropTypes.bool,
};

TextEditor.defaultProps = {
  readOnly: false,
};
