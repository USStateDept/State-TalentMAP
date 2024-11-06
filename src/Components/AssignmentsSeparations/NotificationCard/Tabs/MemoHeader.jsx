import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import InputActions from '../Common/InputActions';

const MemoHeader = (props) => {
  const { getCableValue, modCableValue, handleDefaultClear } = props;

  return (
    <div className="position-content position-form input-container">
      <div className="memo-input-container">
        <InputActions
          keys={['TO_ADDRESS', 'FROM_ADDRESS', 'SUBJECT']}
          getCableValue={getCableValue}
          handleDefaultClear={handleDefaultClear}
        />
        <div className="position-form--label-input-container">
          <label htmlFor="to-input">To</label>
          <input
            id="to-input"
            value={getCableValue('TO_ADDRESS')}
            onChange={(e) => modCableValue('TO_ADDRESS', e.target.value)}
          />
        </div>
        <div className="position-form--label-input-container">
          <label htmlFor="from-input">From</label>
          <input
            id="from-input"
            value={getCableValue('FROM_ADDRESS')}
            onChange={(e) => modCableValue('FROM_ADDRESS', e.target.value)}
          />
        </div>
        <Row fluid className="position-content--description">
          <span className="definition-title">Subject</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={4}
              minRows={4}
              maxLength="500"
              name="subject-input"
              placeholder="No Description"
              value={getCableValue('SUBJECT')}
              onChange={(e) => modCableValue('SUBJECT', e.target.value)}
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {getCableValue('SUBJECT')?.length} / 500
          </div>
        </Row>
      </div>
    </div>
  );
};

MemoHeader.propTypes = {
  getCableValue: PropTypes.func.isRequired,
  modCableValue: PropTypes.func.isRequired,
  handleDefaultClear: PropTypes.func.isRequired,
};

MemoHeader.defaultProps = {
};

export default MemoHeader;
