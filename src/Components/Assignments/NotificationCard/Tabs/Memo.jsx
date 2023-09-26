import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import { Row } from 'Components/Layout';

const Memo = () => {
  const body = 'Lorem ipsum dolor sit amet';

  return (
    <div className="position-content position-form input-container">
      <div className="memo-preview-row">
        <div className="definition-title">To</div>
        <div>{'{{First Name, Last Name}}'}</div>
      </div>
      <div className="memo-preview-row">
        <div className="definition-title">From</div>
        <div>{'{{First Name, Last Name}}'}</div>
      </div>
      <div className="memo-preview-row">
        <div className="definition-title">Subject</div>
        <div>Lorem ipsum dolar sit amet</div>
      </div>
      <div className="memo-preview-row">
        <div className="definition-title">Last Sent</div>
        <div>----</div>
      </div>
      <Row fluid className="position-content--description">
        <span className="definition-title">Body</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            disabled
            maxRows={4}
            minRows={4}
            maxlength="500"
            name="body"
            placeholder="No Description"
            defaultValue={body}
            className="enabled-input"
            draggable={false}
          />
        </Linkify>
        <div className="word-count">
          {body?.length} / 500
        </div>
      </Row>
      <div className="position-form--actions">
        <button onClick={() => { }}>Cancel</button>
        <button onClick={() => { }}>Email Memo</button>
      </div>
    </div>
  );
};

export default Memo;
