import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import { Row } from 'Components/Layout';

const EFM = () => {
  const efm = '';

  return (
    <div className="position-content position-form">
      <Row fluid className="position-content--description">
        <span className="definition-title">EFM</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            maxRows={4}
            minRows={4}
            maxlength="500"
            name="efm"
            placeholder="No Description"
            defaultValue={efm}
            disabled
            className="disabled-input"
            draggable={false}
          />
        </Linkify>
        <div className="word-count">
          {efm?.length} / 500
        </div>
      </Row>
      <div className="position-form--actions">
        <button onClick={() => { }}>Back</button>
        <button onClick={() => { }}>Next</button>
      </div>
    </div>
  );
};

export default EFM;
