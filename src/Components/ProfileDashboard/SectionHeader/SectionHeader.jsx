import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';

const SectionHeader = ({ title, buttonText, icon, onButtonClick }) => (
  <div className="usa-grid-full section-header section-padded-inner-container-narrow">
    <div className="usa-width-two-thirds section-header-text">
      <FontAwesome name={icon} />{title}
    </div>
    {
      buttonText &&
        <div className="usa-width-one-third section-header-button-container">
          <button className="section-header-button" onClick={onButtonClick}>{buttonText}</button>
        </div>
    }
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.node,
  buttonText: PropTypes.node,
  icon: PropTypes.string,
  onButtonClick: PropTypes.func,
};

SectionHeader.defaultProps = {
  title: '',
  buttonText: '',
  icon: 'clock-o',
  onButtonClick: EMPTY_FUNCTION,
};

export default SectionHeader;
