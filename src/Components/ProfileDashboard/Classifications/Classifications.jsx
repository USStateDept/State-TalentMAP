import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

const Classifications = ({ classifications, clientClassifications, isLoading, isPublic,
  userId }) => (
  <div className="usa-grid-full profile-section-container updates-container">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-whole">
        <SectionTitle title="Bidder Classifications" icon="tasks" />
      </div>
      <div className="usa-width-one-whole">
        <CheckboxList
          list={classifications}
          clientClassifications={clientClassifications}
          id="updates"
        />
      </div>
    </div>
    {
      !isLoading &&
      <div className="section-padded-inner-container small-link-container view-more-link-centered">
        <Link to={`/profile/bidtracker/${isPublic ? `public/${userId}` : ''}`}>
          <FA name="pencil" /> Edit Classifications
        </Link>
      </div>
    }
  </div>
);

Classifications.propTypes = {
  classifications: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
  isLoading: PropTypes.bool,
  isPublic: PropTypes.bool,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  isLoading: false,
  isPublic: false,
  userId: '',
};

export default Classifications;
