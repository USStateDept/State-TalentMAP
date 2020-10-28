import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';

const Classifications = ({ classifications, clientClassifications }) => (
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
  </div>
);

Classifications.propTypes = {
  classifications: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
};

export default Classifications;
