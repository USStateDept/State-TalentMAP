import PropTypes from 'prop-types';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';

const Stats = (props) => {
  const {
    placeholderText,
  } = props;

  return (
    <div
      className={'usa-grid-full profile-content-inner-container position-search'}
    >
      {
        !placeholderText &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <div className="usa-grid-full">
        <ProfileSectionTitle title="Bureau Statistics" icon="bar-chart" />
      </div>
      <div className="usa-grid-full position-search">
        {placeholderText}
      </div>
    </div>
  );
};

Stats.propTypes = {
  placeholderText: PropTypes.string,
};

Stats.defaultProps = {
  placeholderText: '',
};

export default Stats;
