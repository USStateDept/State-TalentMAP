import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';

const EFM = (props) => {
  const { getCableValue, modCableValue } = props;

  return (
    <div className="position-content position-form">
      <Row fluid className="position-content--description">
        <span className="definition-title">EFM</span>
        <Linkify properties={{ target: '_blank' }}>
          <TextareaAutosize
            maxRows={8}
            minRows={4}
            maxLength="500"
            name="efm"
            placeholder="No Description"
            value={getCableValue('EFM')}
            onChange={(e) => modCableValue('EFM', e.target.value)}
            disabled
            className="disabled-input"
            draggable={false}
          />
        </Linkify>
        <div className="word-count">
          {getCableValue('EFM')?.length} / 500
        </div>
      </Row>
    </div>
  );
};

EFM.propTypes = {
  getCableValue: PropTypes.func.isRequired,
  modCableValue: PropTypes.func.isRequired,
};

EFM.defaultProps = {
};

export default EFM;
