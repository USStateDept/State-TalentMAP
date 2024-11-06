import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import InputActions from '../Common/InputActions';

const Training = (props) => {
  const { getCableValue, modCableValue, handleDefaultClear } = props;

  return (
    <div className="position-content position-form input-container">
      <InputActions
        keys={['TRAINING']}
        getCableValue={getCableValue}
        handleDefaultClear={handleDefaultClear}
      />
      <Row fluid className="position-content--description">
        <span className="definition-title">Training</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            maxRows={8}
            minRows={4}
            maxLength="500"
            name="training"
            placeholder="No Description"
            value={getCableValue('TRAINING')}
            onChange={(e) => modCableValue('TRAINING', e.target.value)}
            draggable={false}
          />
        </Linkify>
        <div className="word-count">
          {getCableValue('TRAINING')?.length} / 500
        </div>
      </Row>
    </div>
  );
};

Training.propTypes = {
  getCableValue: PropTypes.func.isRequired,
  modCableValue: PropTypes.func.isRequired,
  handleDefaultClear: PropTypes.func.isRequired,
};

Training.defaultProps = {
};


export default Training;
