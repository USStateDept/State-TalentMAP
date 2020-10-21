import PropTypes from 'prop-types';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';

const PositionsList = (props) => {
  const {
    placeholderText,
  } = props;

  return (
    <div
      className={'usa-grid-full profile-content-inner-container bureau-page'}
    >
      {
        !placeholderText &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <div className="usa-grid-full">
        <ProfileSectionTitle title="Positions Lists" icon="list-ol" />
      </div>
      <div className="usa-grid-full bureau-page">
        {placeholderText}
      </div>
    </div>
  );
};

PositionsList.propTypes = {
  placeholderText: PropTypes.string,
};

PositionsList.defaultProps = {
  placeholderText: '',
};

export default PositionsList;
